<template>
    <VRow>
        <VCol cols="12">
            <VCard title="Debtor Details">
                <VCardText>
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>
                            <!-- 👉 First Name -->
                            <VCol md="6" cols="12">
                                <VTextField label="First Name" />
                            </VCol>

                            <!-- 👉 Last Name -->
                            <VCol md="6" cols="12">
                                <VTextField label="Last Name" />
                            </VCol>

                            <!-- 👉 Email -->
                            <VCol cols="12" md="6">
                                <VTextField label="E-mail" type="email" />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField label="Contact No." type="text" />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField label="Complete Address" type="text" />
                            </VCol>

                            <!-- 👉 Form Actions -->
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
                                <VBtn>Save changes</VBtn>

                                <VBtn color="secondary" variant="tonal" type="reset">
                                    Reset
                                </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>

        </VCol>

        <VCol cols="12">
            <VCard title="Loan Details">
                <VCardText>
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>
                            <!-- 👉 First Name -->
                            <VCol md="6" cols="12">
                                <VTextField label="First Name" />
                            </VCol>

                            <!-- 👉 Last Name -->
                            <VCol md="6" cols="12">
                                <VTextField label="Last Name" />
                            </VCol>

                            <!-- 👉 Email -->
                            <VCol cols="12" md="6">
                                <VTextField label="E-mail" type="email" />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField label="Contact No." type="text" />
                            </VCol>

                            <VCol cols="12" md="6">
                                <VTextField label="Complete Address" type="text" />
                            </VCol>

                            <!-- 👉 Form Actions -->
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
                                <VBtn>Save changes</VBtn>

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