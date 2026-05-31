<template>
    <section id="contacto" class="border-t border-(--color-border) py-20 pb-24 scroll-reveal">
        <div class="section-max">
            <div class="mb-14">
                <p class="label-tag mb-2">Hablemos</p>
                <h2 class="font-display text-4xl sm:text-5xl text-(--color-ink) leading-tight">
                    ¿Tienes un proyecto en mente?
                </h2>
                <p class="font-body text-base text-(--color-ink-soft) leading-relaxed mt-4 max-w-lg">
                    Ponte en contacto si quieres colaborar en un proyecto, tienes alguna
                    pregunta o simplemente quieres decir hola.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                <div class="md:col-span-2 portfolio-card p-8 space-y-6">
                    <h3 class="font-display text-2xl text-(--color-ink)">
                        Contacto directo
                    </h3>

                    <div class="space-y-4">
                        <a href="mailto:moises.santos.hernandez45@gmail.com" class="flex items-start gap-3 group">
                            <div
                                class="w-9 h-9 rounded-lg border border-(--color-border-mid) flex items-center justify-center shrink-0 text-(--color-ink-muted) group-hover:text-(--color-ink) group-hover:border-[rgba(24,24,27,0.22)] transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <span class="label-tag block mb-0.5">Email</span>
                                <span
                                    class="font-body text-sm font-medium text-(--color-ink-soft) group-hover:text-(--color-ink) transition-colors duration-200 break-all">moises.santos.hernandez45@gmail.com</span>
                            </div>
                        </a>

                        <div class="flex items-start gap-3">
                            <div
                                class="w-9 h-9 rounded-lg border border-(--color-border-mid) flex items-center justify-center shrink-0 text-(--color-ink-muted)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <span class="label-tag block mb-0.5">Ubicación</span>
                                <span class="font-body text-sm font-medium text-(--color-ink-soft)">San Luis Potosí,
                                    México</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-3 portfolio-card p-8">
                    <form @submit.prevent="handleSubmit" class="space-y-5">
                        <div class="space-y-1.5">
                            <label for="name" class="label-tag block">Nombre completo</label>
                            <input v-model="form.name" type="text" id="name" name="name" placeholder="Juan Pérez"
                                required
                                class="w-full px-4 py-3 rounded-lg border border-(--color-border-mid) bg-(--color-surface) font-body text-sm text-(--color-ink) placeholder:text-(--color-ink-muted) focus:outline-none focus:border-(--color-ink) focus:ring-3 focus:ring-[rgba(24,24,27,0.06)] transition-all" />
                        </div>

                        <div class="space-y-1.5">
                            <label for="email" class="label-tag block">Correo electrónico</label>
                            <input v-model="form.email" type="email" id="email" name="email"
                                placeholder="juan@ejemplo.com" required
                                class="w-full px-4 py-3 rounded-lg border border-(--color-border-mid) bg-(--color-surface) font-body text-sm text-(--color-ink) placeholder:text-(--color-ink-muted) focus:outline-none focus:border-(--color-ink) focus:ring-3 focus:ring-[rgba(24,24,27,0.06)] transition-all" />
                        </div>

                        <div class="space-y-1.5">
                            <label for="message" class="label-tag block">Mensaje</label>
                            <textarea v-model="form.message" id="message" name="message" rows="4"
                                placeholder="Hola Moises, me gustaría hablar contigo sobre un proyecto..." required
                                class="w-full px-4 py-3 rounded-lg border border-(--color-border-mid) bg-(--color-surface) font-body text-sm text-(--color-ink) placeholder:text-(--color-ink-muted) focus:outline-none focus:border-(--color-ink) focus:ring-3 focus:ring-[rgba(24,24,27,0.06)] transition-all resize-none"></textarea>
                        </div>

                        <p v-if="error" class="text-sm text-red-600 font-body">{{ error }}</p>
                        <p v-if="success" class="text-sm text-green-600 font-body">{{ success }}</p>

                        <button type="submit" :disabled="loading"
                            class="btn-primary w-full justify-center py-3.5 group disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="loading">Enviando...</span>
                            <span v-else class="flex items-center gap-2">
                                Enviar Mensaje
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "@/api/config";

const form = ref({
    name: "",
    email: "",
    message: "",
});

const loading = ref(false);
const error = ref("");
const success = ref("");

const handleSubmit = async () => {
    loading.value = true;
    error.value = "";
    success.value = "";

    try {
        await api.post("/contact", {
            name: form.value.name,
            email: form.value.email,
            message: form.value.message,
        });

        success.value = "¡Mensaje enviado con éxito! Te contactaré pronto.";
        form.value = { name: "", email: "", message: "" };
    } catch (err) {
        error.value = "Hubo un error al enviar el mensaje. Intenta de nuevo.";
    } finally {
        loading.value = false;
    }
};
</script>