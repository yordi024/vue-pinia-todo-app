<script lang="ts" setup>
import { useAttrs } from 'vue'
import { Label, LabelProps as LabelRootProps } from 'radix-vue'
import { useFormField } from './useFormField'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

interface LabelProps extends LabelRootProps {
  required?: boolean
}

const props = defineProps<LabelProps>()

const { error, formItemId } = useFormField()
const { class: className, ...rest } = useAttrs()
</script>

<template>
  <Label
    :class="
      cn(
        'block text-sm tracking-tight font-medium text-foreground text-left',
        error && 'text-destructive',
        className ?? '',
      )
    "
    :for="formItemId"
    v-bind="rest"
  >
    <slot />
    <span v-if="props.required" class="text-destructive"> *</span>
  </Label>
</template>
