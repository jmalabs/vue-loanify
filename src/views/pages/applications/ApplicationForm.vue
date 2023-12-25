
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
                            <VCol md="6" cols="12">

                            </VCol>
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
                            <VDivider />

                            <VCol xs="12" md="3" cols="auto">
                                <VTextField label="Amount" type="number" min="1" max="100000" suffix="PHP"
                                    v-model.number="principal" :rules="[fieldValidationRules.required]" />
                            </VCol>
                            <VCol xs="12" md="3" cols="auto">
                                <VTextField label="Monthly Interest" type="number" suffix="%" min="2" max="20"
                                    v-model.number="rate" :rules="[fieldValidationRules.required]" />
                            </VCol>
                            <!-- 👉 Monthly Interest -->
                            <VCol xs="12" md="3" cols="auto" >
                                <VTextField label="Terms" type="number" min="1" max="12" suffix="months"
                                    v-model.number="terms" :rules="[fieldValidationRules.required]" />
                            </VCol>

                            <VDivider />
                            <!-- 👉 Form Actions -->
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
                                <VBtn type="submit">Submit</VBtn>

                                <VBtn color="secondary" variant="tonal" type="reset">
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
export default {
    components: { ProgressSpinner },
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

        const form = ref(null)
        const rateInPercentage = computed(() => {
            return rate.value / 100
        });

        const numberOfPayments = computed(() => {
            return terms.value * 2;
        });

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
                console.log('Form is not valid!');
                return;
            }

            console.log('firstName >>', firstName)

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
                termDetails: getTermDetails(totalAmount, applicationDate.value),
                loanStatus: LoanStatus.LOAN_STATUS.Pending
            }

            try {
                isLoading.value = true;
                await loanifyApi.createApplication(applicationData)
                router.replace({ path: '/debtors' })
            } catch (error) {
                console.log('error', error)
            } finally {

                isLoading.value = false;
            }


        }
        function getTermDetails(totalAmount, applicationDate) {
            const termDetails = [];
            let paymentDate = new Date(applicationDate)

            for (let i = 0; i < numberOfPayments.value; i++) {
                paymentDate.setDate(paymentDate.getDate() + 15);
                termDetails.push({
                    termNo: i + 1,
                    paymentDate: new Date(paymentDate),
                    amount: totalAmount / (numberOfPayments.value > 0 ? numberOfPayments.value : 1)

                })
            }

            return termDetails;
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
            apply
        }
    }
}
</script>
