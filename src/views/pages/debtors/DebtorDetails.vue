<template>
    <v-row justify="center">
        <v-dialog v-model="isVisible" persistent width="1024">
            <v-card>
                <v-card-title class="mt-4">
                    <span class="text-h5">{{ debtor.fullName }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <VForm class="mt-6" ref="form">
                            <VRow>
                                <VCol md="6" cols="12">
                                    <VTextField label="Application Date" type="date" v-model="debtorData.applicationDate">
                                    </VTextField>
                                </VCol>
                                <VCol md="6" cols="12">

                                </VCol>
                                <!-- 👉 First Name -->
                                <VCol md="6" cols="12">
                                    <VTextField label="First Name" v-model="debtorData.firstName" />
                                </VCol>

                                <!-- 👉 Last Name -->
                                <VCol md="6" cols="12">
                                    <VTextField label="Last Name" v-model="debtorData.lastName" />
                                </VCol>

                                <!-- 👉 Email -->
                                <VCol cols="12" md="6">
                                    <VTextField label="E-mail" type="email" v-model="debtorData.email" />
                                </VCol>

                                <VCol cols="12" md="6">
                                    <VTextField label="Contact No." type="text" v-model="debtorData.contactNo" />
                                </VCol>

                                <VCol cols="12" md="12">
                                    <VTextField label="Complete Address" type="text" v-model="debtorData.completeAddress" />
                                </VCol>
                            </VRow>

                            <VRow>
                                <VCol xs="12" md="4" cols="auto">
                                    <VTextField label="Amount" type="number" min="1" max="100000" suffix="PHP"
                                        v-model="debtorData.principal" />
                                </VCol>
                                <VCol xs="12" md="4" cols="auto">
                                    <VTextField label="Monthly Interest" type="number" suffix="%" min="2" max="20"
                                        v-model="debtorData.rate" />
                                </VCol>
                                <!-- 👉 Monthly Interest -->
                                <VCol xs="12" md="4" cols="auto">
                                    <VTextField label="Terms" type="number" min="1" max="12" suffix="months"
                                        v-model="debtorData.terms" />
                                </VCol>

                                <VCol>
                                    <TermDetailsDataTable :termDetails="debtorData.termDetails"></TermDetailsDataTable>
                                </VCol>

                            </VRow>
                            <!-- <VRow>
                                <VCol cols="12" class="d-flex flex-wrap">
                                    <div>
                                        <VBtn type="submit">Submit</VBtn>

                                        <VBtn color="secondary" variant="tonal" @click="isEditForm = true">
                                            Edit
                                        </VBtn>
                                    </div>
                                </VCol>
                            </VRow> -->
                        </VForm>
                    </v-container>
                    <!-- <small>*indicates required field!</small> -->
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import { ref, computed, watch, onMounted, onUpdated, reactive } from 'vue';
import moment from 'moment';
import TermDetailsDataTable from './TermDetailsDataTable.vue';
export default {
    components: { TermDetailsDataTable },
    emits: ['close-modal'],
    props: {
        isModalVisible: Boolean,
        debtor: Object
    },
    setup(props, { emit }) {

        const isVisible = ref(props.isModalVisible);
        const isEditForm = ref(false)


        watch(() => props.debtor, (newValue) => {

            isEditForm.value = false;
            debtor.firstName = newValue.firstName;
            debtor.lastName = newValue.lastName;
            debtor.email = newValue.email;
            debtor.applicationDate = moment(newValue.applicationDate).format('yyyy-MM-DD');
            debtor.contactNo = newValue.contactNo;
            debtor.completeAddress = newValue.completeAddress;
            debtor.terms = newValue.terms
            debtor.rate = newValue.rate
            debtor.principal = newValue.principal
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
        const debtor = reactive(props.debtor);


        watch(() => props.isModalVisible, (newValue) => {
            isVisible.value = newValue;
        })


        const closeModal = () => {
            isVisible.value = false;
            emit('close-modal');
        };




        // const closeModal = ref(false);

        // const initialValue = computed(() => {

        //     console.log('props.isOpen && !closeModal.value ', props.isOpen && !closeModal.value)
        //     return props.isOpen && !closeModal.value
        // });


        return { isVisible, closeModal, debtorData: debtor, isEditForm }
    }
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