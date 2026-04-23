<template>
    <Head title="Register Tournament" />
    <TheHeader />
    <div class="page">
        <BaseCard class="tournament-base-card">
            <div class="stack stack--lg">
                <h1>Register Tournament</h1>
                <BaseCard class="tournament-details">
                    <form @submit.prevent="submitForm">
                        <div class="field-long">
                            <input type="text" id="name" name="name" placeholder="Tournament Name" v-model.trim="tournamentData.name.value" @blur="validateField('name')"/>
                            <p v-if="!tournamentData.name.isValid" class="error">{{ tournamentData.name.message }}</p>
                            <input type="text" id="location" name="location" placeholder="Tournament Location" v-model.trim="tournamentData.location.value" @blur="validateField('location')"/>
                            <p v-if="!tournamentData.location.isValid" class="error">{{ tournamentData.location.message }}</p>
                        </div>
                        <div class="field-short">
                            <input type="datetime-local" id="startDate" placeholder="Start Date" v-model.trim="tournamentData.startDate.value" @blur="validateField('startDate')">
                            <p v-if="!tournamentData.startDate.isValid" class="error">{{ tournamentData.startDate.message }}</p>
                            <input type="datetime-local" id="endDate" placeholder="End Date" v-model.trim="tournamentData.endDate.value" @blur="validateField('endDate')">
                            <p v-if="!tournamentData.endDate.isValid" class="error">{{ tournamentData.endDate.message }}</p>
                        </div>
                        <div class="field-long">
                            <textarea id="description" placeholder="Tournament description (Optional)"
                             rows="4"
                              v-model.trim="tournamentData.description.value"
                               @blur="validateField('description')">
                            </textarea>
                        </div>
                        <div class="upload-image">
                            <p class="upload-image-text">Upload tournament poster (max 2MB)</p>
                            <input type="file" id="image" placeholder="Upload Image" @change="handleFileUpload">
                        </div>
                        <AuthButton type="submit" label="Add Tournament"/>
                    </form>
                </BaseCard>
                <BaseCard class="tournament-time">
                    <h1>My registered tournaments (develop later)</h1>
                </BaseCard>
            </div>
        </BaseCard>
    </div>
</template>


<script setup>
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import AuthButton from '../components/buttons/AuthButton.vue';
import TheHeader from '../components/layout/TheHeader.vue';
import BaseCard from '../components/ui/BaseCard.vue';


const tournamentData = ref({
    formIsValid: true,
    name: {
        type: String,
        value: '',
        required: true,
        isValid: true,
        message: 'Tournament name is required',
    },
    location: {
        type: String,
        value: '',
        required: true,
        isValid: true,
        message: 'Tournament location is required',
    },
    startDate: {
        type: Date,
        value: '',
        required: true,
        isValid: true,
        message: 'Start date is required',
    },
    endDate: {
        type: Date,
        value: '',
        required: true,
        isValid: true,
        message: 'End date is required',
    },
    description: {
        type: String,
        value: '',
        required: false,
        isValid: true
    },
    image: {
        type: File,
        value: null,
        required: false,
        isValid: true,
        message: 'Image is required',
    },
});

function validateField(field) {
    tournamentData[field].isValid = true;
}

function submitForm() {
    const isValid = validateForm();

    if (isValid) {
        const dataForm = {
            name: this.tournamentData.name.value,
            location: this.tournamentData.location.value,
            startDate: this.tournamentData.startDate.value,
            endDate: this.tournamentData.endDate.value,
            description: this.tournamentData.description.value,
            image: this.tournamentData.image.value,
        }
        console.log('dataForm', dataForm);

        return dataForm; //temporary return for testing

    } else {
        return false;
    }

}
function handleFileUpload() {
    tournamentData.value.image = event.target.files[0];
    console.log('file uploaded', tournamentData.value.image);
};

function validateForm() {
    if (this.tournamentData.name.value === '') {
        this.tournamentData.name.isValid = false;
        this.tournamentData.formIsValid = false;
    }

    if (this.tournamentData.location.value === '') {
        this.tournamentData.location.isValid = false;
        this.tournamentData.formIsValid = false;
    }

    if (this.tournamentData.startDate.value === '') {
        this.tournamentData.startDate.isValid = false;
        this.tournamentData.formIsValid = false;
    }

    if (this.tournamentData.endDate.value === '') {
        this.tournamentData.endDate.isValid = false;
        this.tournamentData.formIsValid = false;
    }

    if (this.tournamentData.description.value === '') {
        this.tournamentData.description.isValid = false;
    }

    if (this.tournamentData.image.value === null) {
        this.tournamentData.image.isValid = false;
        this.tournamentData.formIsValid = false;
    }

    if (this.tournamentData.formIsValid) {
        console.log('form is valid');
    }
    
    return this.tournamentData.formIsValid;
}

</script>


<style scoped>
.tournament-details {
    min-width: 450px;
}

.field-long {
    display: flex;
    flex-direction: column;
}
.field-short {
    display: flex;
    flex-direction: row;
    gap: 3rem;
}
input{
    height: 2rem;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #000000;
}
textarea {
    height: 10rem;
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #000000;
    padding: 0.5rem;
}
.upload-image-text {
    font-size: 0.9rem;
    color: #000000;
}
</style>