<script setup>
defineProps({
    variant:{
        type: String,
        default: 'default'
    }
})
defineEmits(["click"])

const variants = {
    default : 'border border-grey-200 hover:bg-gray-400 hover:text-white',
    danger: 'bg-red-100 enabled:hover:bg-red-200 text-red-900'
}

</script>

<template>
    <button :class="['text-sm font-medium rounded-full px-3 py-1', variants[variant] ?? variants.default]" @click="$emit('click')"> <slot></slot></button>
</template>