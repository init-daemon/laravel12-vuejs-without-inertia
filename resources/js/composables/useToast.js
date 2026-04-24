import { toast as toastSonner } from 'vue-sonner'

const TOAST_VARIANTS = ['success', 'info', 'warning', 'error']

/**
 * Displays a notification message.
 *
 * @param {Object} options - Configuration options for the notification.
 * @param {string} [options.variant='info'] - The type of toast (e.g., ‘success’, ‘info’, ‘warning’, ‘error’).
 * @param {string|null} [options.title=null] - The title of the toast message.
 * @param {string|null} [options.description=null] - Additional descriptive text for the toast.
 * @param {Object} [options.toastData={}] -  Additional data to be passed to the underlying library.
 * @returns {string|number} The identifier of the created toast (used for removal).
 */
function showToast({
    variant = 'info',
    title = null,
    description = null,
    toastData = {},
}) {
    const variantKey = TOAST_VARIANTS.includes(variant) ? variant : 'info'
    const finalTitle = title ?? (variantKey.charAt(0).toUpperCase() + variantKey.slice(1))

    return toastSonner[variantKey](finalTitle, {
        description,
        ...toastData,
    })
}

const success = (options = {}) => showToast({ ...options, variant: 'success' })
const info = (options = {}) => showToast({ ...options, variant: 'info' })
const warning = (options = {}) => showToast({ ...options, variant: 'warning' })
const error = (options = {}) => showToast({ ...options, variant: 'error' })

/**
 * Composable function for utilizing toast notifications.
 */
export function useToast() {
    return {
        toast: showToast,
        success,
        info,
        warning,
        error,
    }
}
