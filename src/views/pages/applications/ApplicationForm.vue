
<template>
    <progress-spinner :isLoading="isLoading"></progress-spinner>
    <VRow>
        <VCol cols="12">
            <VCard title="Application Details">
                <VCardText>
                    <!-- 👉 Form -->
                    <VForm class="mt-6" @submit.prevent="apply" ref="form">
                        <VRow>
                            <VCol md="6" cols="12">
                                <VTextField label="Application Date" v-model="applicationDate" type="date"
                                    :rules="[fieldValidationRules.required]"></VTextField>
                            </VCol>
                        </VRow>
                        <VRow>

                            <!-- 👉 First Name -->
                            <VCol md="6" cols="12">
                                <VTextField label="First Name" v-model="firstName"
                                    :rules="[fieldValidationRules.required]" />
                            </VCol>

                            <!-- 👉 Last Name -->
                            <VCol md="6" cols="12">
                                <VTextField label="Last Name" v-model="lastName" :rules="[fieldValidationRules.required]" />
                            </VCol>

                            <!-- 👉 Email -->
                            <VCol cols="12" md="6">
                                <VTextField label="E-mail" type="email" v-model="email"
                                    :rules="[fieldValidationRules.required]" />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField label="Contact No." type="text" v-model="contactNo"
                                    :rules="[fieldValidationRules.required]" />
                            </VCol>

                            <VCol cols="12" md="12">
                                <VTextField label="Complete Address" type="text" v-model="completeAddress"
                                    :rules="[fieldValidationRules.required]" />
                            </VCol>
                        </VRow>

                        <VRow>
                            <VCol xs="12" md="4" cols="auto">
                                <VTextField label="Amount" type="number" min="1" max="100000" suffix="PHP"
                                    v-model.number="principal" :rules="[fieldValidationRules.required]" />
                            </VCol>
                            <VCol xs="12" md="4" cols="auto">
                                <VTextField label="Monthly Interest" type="number" suffix="%" min="2" max="20"
                                    v-model.number="rate" :rules="[fieldValidationRules.required]" />
                            </VCol>
                            <!-- 👉 Monthly Interest -->
                            <VCol xs="12" md="4" cols="auto">
                                <VTextField label="Terms" type="number" min="1" max="12" suffix="months"
                                    v-model.number="terms" :rules="[fieldValidationRules.required]" />
                            </VCol>
                            <VCol>
                                <TermDetails :totalAmount="totalAmount" :applicationDate="new Date(applicationDate)"
                                    :numberOfPayments="numberOfPayments" :terms="terms" @term-details="setTermDetails" />
                            </VCol>
                        </VRow>
                        <VRow>
                            <VCol cols="12" class="d-flex flex-wrap">
                                <VBtn type="submit" class="mx-4 ml-0">Apply</VBtn>
                                <VBtn color="secondary" class="mx-4" variant="tonal" type="reset">
                                    Reset
                                </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<script>
import ProgressSpinner from '@core/components/ProgressSpinner.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import loanifyApi from '../../../services/loanify/loanifyApi.vue';
import LoanStatus from '../../../utils/status';
import TermDetails from '../applications/TermsDetails.vue'
export default {
    components: { ProgressSpinner, TermDetails },
    setup() {


        const router = useRouter();


        const applicationDate = ref(new Date().toISOString().substring(0, 10));
        const principal = ref(0);
        const firstName = ref("")
        const lastName = ref("")
        const email = ref("")
        const contactNo = ref("")
        const completeAddress = ref("")
        const terms = ref(0)
        const rate = ref(0)
        const isLoading = ref(false);
        let termData = []

        const form = ref(null)
        const rateInPercentage = computed(() => {
            return rate.value / 100
        });

        const numberOfPayments = computed(() => {
            return terms.value * 2;
        });

        const totalAmount = computed(() => {
            const interest = calculateInterest(principal.value, rateInPercentage.value, terms.value);

            return principal.value + interest;
        })

        const fieldValidationRules = {
            required: value => !!value || 'Field is required',
        }

        async function validateForm() {
            const { valid } = await form.value.validate()


            if (!valid) {
                return false;
            }

            return true;
        }
        async function apply() {

            if (!await validateForm()) {
                return;
            }


            const totalInterest = calculateInterest(principal.value, rateInPercentage.value, terms.value);
            const totalAmount = principal.value + totalInterest;
            const applicationData = {
                applicationDate: applicationDate.value,
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                contactNo: contactNo.value,
                completeAddress: completeAddress.value,
                terms: terms.value,
                rate: rate.value,
                principal: +principal.value,
                rateInPercentage: rateInPercentage.value,
                totalAmount,
                termDetails: termData,
                loanStatus: LoanStatus.LOAN_STATUS.Pending
            }

            try {
                isLoading.value = true;
                await loanifyApi.createApplication(applicationData)
                router.replace({ path: '/debtors' })
            } catch (error) {
            } finally {

                isLoading.value = false;
            }


        }

        function setTermDetails(termDetails) {
            termData = [...termDetails]
        }

        function calculateInterest(principal, rate, terms) {
            let totalInterest = 0;

            for (let i = 0; i < terms; i++) {
                let interestForMonth = principal * rate;
                totalInterest += interestForMonth;
                principal += interestForMonth;
            }

            return totalInterest;
        }

        return {
            firstName,
            lastName,
            email,
            contactNo,
            completeAddress,
            applicationDate,
            principal,
            terms,
            rate,
            isLoading,
            fieldValidationRules,
            form,
            totalAmount,
            numberOfPayments,
            apply,
            setTermDetails
        }
    }
}
</script>
