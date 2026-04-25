<template>
    <Head title="Register Tournament" />
    <TheHeader />
    <div class="page">
        <BaseCard class="tournament-base-card">
            <div class="stack stack--lg">
                <h1>Register New Tournament</h1>
                <BaseCard class="tournament-details">
                    <form @submit.prevent="submitForm">
                        <div class="field-long">
                            <div class="field-long-item">
                                <input type="text" :class="{invalid: !tournamentData.name.isValid}" id="name" name="name" placeholder="Tournament Name" v-model.trim="tournamentData.name.value" @blur="validateField('name')"/>
                                <p v-if="!tournamentData.name.isValid" class="error">{{ tournamentData.name.message }}</p>
                            </div>
                            <div class="field-long-item">
                                <input type="text" :class="{invalid: !tournamentData.location.isValid}" id="location" name="location" placeholder="Tournament Location" v-model.trim="tournamentData.location.value" @blur="validateField('location')"/>
                                <p v-if="!tournamentData.location.isValid" class="error">{{ tournamentData.location.message }}</p>
                            </div>
                        </div>
                        <div class="field-short">
                            <div class="field-short-item">
                                <label for="startDate">Start Date:</label>
                                <input type="datetime-local" :class="{invalid: !tournamentData.startDate.isValid}" id="startDate" v-model.trim="tournamentData.startDate.value" @blur="validateField('startDate')">
                                <p v-if="!tournamentData.startDate.isValid" class="error">{{ tournamentData.startDate.message }}</p>
                            </div>
                            <div class="field-short-item">
                                <label for="endDate">End Date:</label>
                                <input type="datetime-local" :class="{invalid: !tournamentData.endDate.isValid}" id="endDate" v-model.trim="tournamentData.endDate.value" @blur="validateField('endDate')">
                                <p v-if="!tournamentData.endDate.isValid" class="error">{{ tournamentData.endDate.message }}</p>
                            </div>
                        </div>
                        <div class="field-long">
                            <textarea :class="{invalid: !tournamentData.description.isValid}" id="description" placeholder="Tournament description (Optional)"
                             rows="4"
                              v-model.trim="tournamentData.description.value">
                            </textarea>
                        </div>
                        <div class="upload-image">
                            <label for="image">Upload tournament poster (max 2MB)</label>
                            <input type="file" :class="{invalid: !tournamentData.image.isValid}" id="image" placeholder="Upload Image" @change="handleFileUpload" @blur="validateField('image')">
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
import { CLOUDFLARE_FOLDER_NAMES } from '../features/constants';
import { registerTournament } from '../features/tournaments/tournamentApi';
import { generateUniqueFileName } from '../features/tournaments/utils';
import { useUserStore } from '../features/user/userStore';

const userStore = useUserStore();


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
    userId: {
        type: String,
        value: userStore.user?.id || '',
        required: true,
        isValid: true,
        message: 'User ID is required',
    },
    image: {
        type: File,
        fileName: '',
        value: null,
        required: false,
        isValid: true,
        acceptedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
        maxSize: 2 * 1024 * 1024, // 2MB
    },
});

function validateField(field) {
    tournamentData.value[field].isValid = true;
}

async function submitForm() {
    const isValid = validateForm();

    if (isValid) {
        const dataForm = {
            name: tournamentData.value.name.value,
            location: tournamentData.value.location.value,
            startDate: tournamentData.value.startDate.value,
            endDate: tournamentData.value.endDate.value,
            description: tournamentData.value.description.value,
            directorId: tournamentData.value.userId.value
        }

        if (tournamentData.value.image.isValid && tournamentData.value.image.fileName !== '') {
            dataForm.posterReference = tournamentData.value.image.fileName;
        }

        if (!tournamentData.value.userId.value) {
            console.error('Cannot register tournament without user ID');
            
            return;
        }
        
        try {
            const response = await registerTournament(dataForm, tournamentData.value.image.value);
            console.log('response', response);
        } catch (error) {
            console.error('error', error);
        }
    } else {
        alert('Form is not valid');
    }

};

function handleFileUpload(e) {
    const uploadedFile = e.target.files[0];
    validateFile(uploadedFile);
};

function validateFile(file) {

    if (!tournamentData.value.image.acceptedTypes.includes(file.type)) {
        tournamentData.value.image.isValid = false;
        tournamentData.value.image.value = '';
        tournamentData.value.image.fileName = '';
        alert(`File type is not accepted. File type: ${file.type}`);

        return false;
    } else if (file.size > tournamentData.value.image.maxSize) {
        tournamentData.value.image.isValid = false;
        tournamentData.value.image.value = '';
        tournamentData.value.image.fileName = '';
        alert(`File size is too large to upload. File size: ${file.size}`);

        return false;
    } else {
        tournamentData.value.image.isValid = true;
        tournamentData.value.image.value = file;
        tournamentData.value.image.fileName = generateUniqueFileName(CLOUDFLARE_FOLDER_NAMES.TOURNAMENT_POSTERS, file.name);
    }
};

function validateForm() {
    tournamentData.value.formIsValid = true;

    if (tournamentData.value.name.value === '') {
        tournamentData.value.name.isValid = false;
        tournamentData.value.formIsValid = false;
    }

    if (tournamentData.value.location.value === '') {
        tournamentData.value.location.isValid = false;
        tournamentData.value.formIsValid = false;
    }

    if (tournamentData.value.startDate.value === '') {
        tournamentData.value.startDate.isValid = false;
        tournamentData.value.formIsValid = false;
    }

    if (tournamentData.value.endDate.value === '' || (tournamentData.value.startDate.value && 
    tournamentData.value.startDate.value > tournamentData.value.endDate.value)) {
        tournamentData.value.endDate.isValid = false;
        tournamentData.value.formIsValid = false;
    }

    if (tournamentData.value.description.value && tournamentData.value.description.value.length < 10) {
        tournamentData.value.description.isValid = false;
    }
    
    return tournamentData.value.formIsValid;
};

</script>


<style scoped>
.tournament-details {
    min-width: 450px;
}

.field-long {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}
.field-long-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}
.field-short {
    display: flex;
    flex-direction: row;
    gap: 3rem;
}
.field-short-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    
}
input{
    height: 2rem;
    width: 100%;
    padding: 0.5rem;
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
.upload-image {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}
.invalid {
    border: 1px solid #ff0000;
}
.error {
    color: #ff0000;
    font-size: 0.8rem;
    margin-top: 0.5rem;
}
label {
    font-size: 0.8rem;
    color: #000000;
    margin-bottom: 0.5rem;
}
</style>