
<template>
    <progress-spinner :isLoading="isLoading"></progress-spinner>
    <VRow>
        <VCol cols="12">
            <VCard title="Application Details">
                <VCardText>
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>
                            <VCol md="6" cols="12">
                                <VTextField label="Application Date" v-model="applicationDate" type="date" ></VTextField>
                            </VCol>
                            <VCol md="6" cols="12">

                            </VCol>
                            <!-- 👉 First Name -->
                            <VCol md="6" cols="12">
                                <VTextField label="First Name" v-model="firstName" />
                            </VCol>

                            <!-- 👉 Last Name -->
                            <VCol md="6" cols="12">
                                <VTextField label="Last Name" v-model="lastName" />
                            </VCol>

                            <!-- 👉 Email -->
                            <VCol cols="12" md="6">
                                <VTextField label="E-mail" type="email" v-model="email" />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField label="Contact No." type="text" v-model="contactNo" />
                            </VCol>

                            <VCol cols="12" md="12">
                                <VTextField label="Complete Address" type="text" v-model="completeAddress" />
                            </VCol>
                            <VDivider />

                            <VCol md="3" cols="3">
                                <VTextField label="Amount" type="number" min="1" max="100000" suffix="PHP"
                                    v-model.number="principal" />
                            </VCol>
                            <VCol md="3" cols="3">
                                <VTextField label="Monthly Interest" type="number" suffix="%" min="2" max="20"
                                    v-model.number="rate" />
                            </VCol>
                            <!-- 👉 Monthly Interest -->
                            <VCol md="3" cols="3">
                                <VTextField label="Terms" type="number" min="1" max="12" suffix="months"
                                    v-model.number="terms" />
                            </VCol>

                            <VDivider />
                            <!-- 👉 Form Actions -->
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
                                <VBtn @click="apply">Save changes</VBtn>

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
        const rateInPercentage = computed(() => {
            return rate.value / 100
        });

        const numberOfPayments = computed(() => {
            return terms.value * 2;
        });

        async function apply() {
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
                red


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
            apply
        }
    }
}
</script>
<!-- <style scoped>
.center-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* Ensure content fills the height */
}
</style> -->