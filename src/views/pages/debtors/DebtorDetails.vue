<template>
  <VRow justify="center">
    <VDialog
      v-model="isVisible"
      persistent
      width="1024"
    >
      <VCard>
        <VCardTitle class="mt-4">
          <span class="text-h5">{{ debtor.fullName }}</span>
        </VCardTitle>
        <VCardText>
          <VContainer>
            <VForm
              ref="form"
              class="mt-6"
              :disabled="false"
            >
              <VRow>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="debtorData.applicationDate"
                    label="Application Date"
                    type="date"
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
                    v-model="debtorData.firstName"
                    label="First Name"
                  />
                </VCol>

                <!-- 👉 Last Name -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="debtorData.lastName"
                    label="Last Name"
                  />
                </VCol>

                <!-- 👉 Email -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="debtorData.email"
                    label="E-mail"
                    type="email"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="debtorData.contactNo"
                    label="Contact No."
                    type="text"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextField
                    v-model="debtorData.completeAddress"
                    label="Complete Address"
                    type="text"
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
                    label="Amount"
                    v-model="debtorData.principal"
                    type="number"
                    min="1"
max="100000"
                    suffix="PHP"
                  />
                </VCol>
                <VCol
                  xs="12"
                  md="4"
                  cols="auto"
                >
                  <VTextField
                    label="Monthly Interest"
                    v-model="debtorData.rate"
                    type="number"
                    suffix="%"
min="2"
                    max="20"
                  />
                </VCol>
                <!-- 👉 Monthly Interest -->
                <VCol
                  xs="12"
                  md="4"
                  cols="auto"
                >
                  <VTextField
                    label="Terms"
                    v-model="debtorData.terms"
                    type="number"
                    min="1"
max="12"
                    suffix="months"
                  />
                </VCol>
                <VCol cols="12">
                  <p class="text-subtitle-1 font-weight-medium">
                    Total Interest: {{
                      debtorData.totalInterest?.toFixed(2) ?? 0.00.toFixed(2) }}
                  </p>
                  <p class="text-subtitle-1 font-weight-medium">
                    Total Amount: {{
                      debtorData.totalAmount?.toFixed(2) }}
                  </p>
                </VCol>
                <VCol cols="12">
                  <TermDetailsDataTable :term-details="debtorData.termDetails" />
                </VCol>
              </VRow>
              <!--
                <VRow>
                <VCol cols="12" class="d-flex flex-wrap">
                <div>
                <VBtn type="submit">Submit</VBtn>

                <VBtn color="secondary" variant="tonal" @click="isEditForm = true">
                Edit
                </VBtn>
                </div>
                </VCol>
                </VRow> 
              -->
            </VForm>
          </VContainer>
          <!-- <small>*indicates required field!</small> -->
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="error"
            variant="tonal"
            @click="closeModal"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>

<script>
import moment from 'moment';
import { reactive, ref, watch } from 'vue';
import TermDetailsDataTable from './TermDetailsDataTable.vue';
export default {
  components: { TermDetailsDataTable },
  props: {
    isModalVisible: Boolean,
    debtor: Object,
  },
  emits: ['close-modal'],
  setup(props, { emit }) {

    const isVisible = ref(props.isModalVisible)
    const isEditForm = ref(false)


    watch(() => props.debtor, newValue => {

      isEditForm.value = false
      debtor.firstName = newValue.firstName
      debtor.lastName = newValue.lastName
      debtor.email = newValue.email
      debtor.applicationDate = moment(newValue.applicationDate).format('yyyy-MM-DD')
      debtor.contactNo = newValue.contactNo
      debtor.completeAddress = newValue.completeAddress
      debtor.terms = newValue.terms
      debtor.rate = newValue.rate
      debtor.principal = newValue.principal
      debtor.totalAmount = newValue.totalAmount
      debtor.totalInterest = newValue.totalInterest
      debtor.termDetails = newValue.termDetails



      // id: key,
      //             firstName: data[key]?.firstName,
      //             lastName: data[key]?.lastName,
      //             fullName: `${data[key]?.firstName} ${data[key]?.lastName}`,
      //             applicationDate: new Date(data[key]?.applicationDate),
      //             completeAddress: data[key]?.completeAddress,
      //             email: data[key]?.email,
      //             contactNo: data[key]?.contactNo,
      //             principal: data[key]?.principal,
      //             terms: data[key]?.terms,
      //             rate: data[key]?.rate,
      //             status: data[key]?.loanStatus,

    })
    const debtor = reactive(props.debtor)


    watch(() => props.isModalVisible, newValue => {
      isVisible.value = newValue
    })


    const closeModal = () => {
      isVisible.value = false
      emit('close-modal')
    }




    // const closeModal = ref(false);

    // const initialValue = computed(() => {

    //     console.log('props.isOpen && !closeModal.value ', props.isOpen && !closeModal.value)
    //     return props.isOpen && !closeModal.value
    // });


    return { isVisible, closeModal, debtorData: debtor, isEditForm }
  },

  // setup(props) {

  //     const isOpenRef = ref(props.isOpen)
  //     watch(props.isOpen, (n, o) => {
  //         isOpenRef.value = n; 
  //     })
  //     function close() {
  //         console.log('close beg@in')
  //         isOpenRef.value = false;
  //         console.log('close end')
  //     }
  //     // console.log('props.open ' + props.isOpen )
  //     // const dialog = ref(props.isOpen);

  //     return { isOpen: isOpenRef, close }
  // },

  //   data: () => ({
  //     dialog: false,
  //   }),
}
</script>