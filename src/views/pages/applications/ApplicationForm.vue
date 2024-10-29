<template>
  <ProgressSpinner :is-loading="isLoading" />
  <VRow>
    <VCol cols="12">
      <VCard title="Application Details">
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="form"
            class="mt-6"
            @submit.prevent="apply"
          >
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="applicationDate"
                  label="Application Date"
                  type="date"
                  :rules="[fieldValidationRules.required]"
                />
              </VCol>
            </VRow>
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="firstName"
                  label="First Name"
                  :rules="[fieldValidationRules.required]"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="lastName"
                  label="Last Name"
                  :rules="[fieldValidationRules.required]"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="email"
                  label="E-mail"
                  type="email"
                  :rules="[fieldValidationRules.required]"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="contactNo"
                  label="Contact No."
                  type="text"
                  :rules="[fieldValidationRules.required]"
                />
              </VCol>

              <VCol
                cols="12"
                md="12"
              >
                <VTextField
                  v-model="completeAddress"
                  label="Complete Address"
                  type="text"
                  :rules="[fieldValidationRules.required]"
                />
              </VCol>
            </VRow>

            <VRow>
              <VCol
                xs="12"
                md="4"
                cols="auto"
              >
                <VTextField
                  v-model.number="principal"
                  label="Amount"
                  type="number"
                  min="1"
                  max="100000"
                  suffix="PHP"
                  :rules="[fieldValidationRules.required]"
                />
              </VCol>
              <VCol
                xs="12"
                md="4"
                cols="auto"
              >
                <VTextField
                  v-model.number="rate"
                  label="Monthly Interest"
                  type="number"
                  suffix="%"
                  min="2"
                  max="20"
                  :rules="[fieldValidationRules.required]"
                />
              </VCol>
              <!-- 👉 Monthly Interest -->
              <VCol
                xs="12"
                md="4"
                cols="auto"
              >
                <VTextField
                  v-model.number="terms"
                  label="Terms"
                  type="number"
                  min="1"
                  max="12"
                  suffix="months"
                  :rules="[fieldValidationRules.required]"
                />
              </VCol>
              <VCol cols="12">
                <p class="text-subtitle-1 font-weight-medium">
                  Total Interest: {{ totalInterest }}
                </p>
                <p class="text-subtitle-1 font-weight-medium">
                  Total Amount: {{ totalAmount }}
                </p>
              </VCol>
              <VCol cols="12">
                <TermDetails
                  :total-amount="totalAmount"
                  :application-date="new Date(applicationDate)"
                  :number-of-payments="numberOfPayments"
                  :terms="terms"
                  @term-details="setTermDetails"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol
                cols="12"
                class="d-flex flex-wrap"
              >
                <VBtn
                  type="submit"
                  class="mx-4 ml-0"
                >
                  Apply
                </VBtn>
                <VBtn
                  color="secondary"
                  class="mx-4"
                  variant="tonal"
                  type="reset"
                >
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
import ProgressSpinner from '@core/components/ProgressSpinner.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import loanifyApi from '../../../services/loanify/loanifyApi.vue'
import LoanStatus from '../../../utils/status'
import TermDetails from '../applications/TermsDetails.vue'
export default {
  components: { ProgressSpinner, TermDetails },
  setup() {


    const router = useRouter()


    const applicationDate = ref(new Date().toISOString().substring(0, 10))
    const principal = ref(0)
    const firstName = ref("")
    const lastName = ref("")
    const email = ref("")
    const contactNo = ref("")
    const completeAddress = ref("")
    const terms = ref(0)
    const rate = ref(0)
    const isLoading = ref(false)
    let termData = []

    const form = ref(null)
    const rateInPercentage = computed(() => {
      return rate.value / 100
    })

    const numberOfPayments = computed(() => {
      return terms.value * 2
    })

    const totalAmount = computed(() => {
      const interest = calculateInterest(principal.value, rateInPercentage.value, terms.value)
      const total = principal.value + interest
      
      return Number(total ?? 0).toFixed(2)
    })

    const totalInterest = computed(() => {
      return calculateInterest(principal.value, rateInPercentage.value, terms.value)?.toFixed(2) ?? 0.00
    })

    const fieldValidationRules = {
      required: value => !!value || 'Field is required',
    }

    async function validateForm() {
      const { valid } = await form.value.validate()


      if (!valid) {
        return false
      }

      return true
    }
    async function apply() {

      console.log('APPLY')
      if (!await validateForm()) {
        return
      }

      console.log('PASS VALIDATION')


      // const totalAmount = principal.value + totalInterest;
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
        totalAmount: Number(totalAmount.value),
        totalInterest: Number(totalInterest.value),
        termDetails: termData,
        loanStatus: LoanStatus.LOAN_STATUS.Pending,
      }

      try {
        isLoading.value = true
        await loanifyApi.createApplication(applicationData)
        router.replace({ path: '/debtors' })
      } catch (error) {
        console.log('error', error)
      } finally {

        isLoading.value = false
      }


    }

    function setTermDetails(termDetails) {
      termData = [...termDetails]
    }

    function calculateInterest(principal, rate, terms) {
      let totalInterest = 0

      for (let i = 0; i < terms; i++) {
        let interestForMonth = principal * rate
        totalInterest += interestForMonth
        principal += interestForMonth
      }

      return totalInterest
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
      totalInterest,
      numberOfPayments,
      apply,
      setTermDetails,
    }
  },
}
</script>
