<template>
    <base-card>
        <article class="tournament">
            <div class="tournament__media">
                <img class="tournament__poster" src="{{ posterSrc }}" :alt="`${name} poster`" loading="lazy" />
            </div>
            <div class="tournament__main">
                <h2 class="tournament__title">{{ name }}</h2>
                <div class="tournament__meta">
                    <span class="tournament__location">{{ location }}</span>
                    <span class="tournament__dates">{{ getDateRange() }}</span>
                </div>
            </div>
            <div class="tournament__stats">
                <span class="tournament__stat">{{ entries }} entries</span>
                <span class="tournament__stat categories">{{ categories }} categories</span>
            </div>
        </article>
    </base-card>
</template>


<script setup>
import { computed } from 'vue';
import BaseCard from '../ui/BaseCard.vue';


const { id, name, location, startDate, endDate, image, entries, categories } = defineProps({
    id: Number,
    name: String,
    location: String,
    startDate: String,
    endDate: String,
    image: String,
    entries: Number,
    categories: Number
});

const fallbackPoster = '../../../../storage/images/default.jpg';
const posterSrc = computed(() => ('../../../..' + image.replace("\\", "")) || fallbackPoster);
console.log('../../../..' + image.replace("\\", ""));

function getPoster() {
    return image || fallbackPoster;
}

function getDateRange() {
    if (startDate === endDate) {
        return startDate;
    }

    const startDateString = startDate.split('.').slice(0, 2).join('.');

    return `${startDateString} - ${endDate}`;
    
}





</script>

<style scoped>
.tournament {
    display: grid;
    grid-template-columns: 96px 1fr auto;
    align-items: center;
    gap: 1rem;
}

.tournament__media {
    width: 96px;
}

.tournament__poster {
    width: 96px;
    aspect-ratio: 2 / 3;
    height: auto;
    display: block;
    object-fit: cover;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.04);
}

.tournament__main {
    min-width: 0;
}

.tournament__title {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.2;
    font-weight: 700;
    word-break: break-word;
    text-align: center;
}

.tournament__meta {
    margin-top: 0.4rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.75rem;
    font-weight: 600;
    color: rgba(23, 23, 23, 0.8);
    justify-content: space-evenly;
    align-self: flex-end;
    transform: translateY(1.5rem);
}

.tournament__stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.35rem;
    font-weight: 700;
    white-space: nowrap;
}

.tournament__stat {
    font-size: 0.95rem;
}

.tournament__stat.categories {
    display: flex;
    transform: translateY(1.5rem);
}

@media (max-width: 520px) {
    .tournament {
        grid-template-columns: 1fr;
        align-items: start;
    }

    .tournament__media {
        width: 100%;
    }

    .tournament__poster {
        width: 100%;
        max-width: 260px;
    }

    .tournament__stats {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        white-space: normal;
        gap: 0.5rem 0.75rem;
    }
}

</style>
