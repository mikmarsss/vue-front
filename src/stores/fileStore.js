import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFileStore = defineStore('files', () => {
  const activeFilter = ref('all')
  const files = ref([])
  const fileSizeFrom = ref(null)
  const fileSizeTo = ref(null)

  const setActiveFilter = (filter) => {
    activeFilter.value = filter
  }

  const setFileSizeFilter = (from, to) => {
    fileSizeFrom.value = from
    fileSizeTo.value = to
  }

  const clearSizeFilter = () => {
    fileSizeFrom.value = null
    fileSizeTo.value = null
  }

  const filteredFiles = computed(() => {
    let filtered = files.value

    if (activeFilter.value !== 'all') {
      filtered = filtered.filter((file) => file.contentType === activeFilter.value)
    }

    if (fileSizeFrom.value !== null || fileSizeTo.value !== null) {
      filtered = filtered.filter((file) => {
        const fileSize = file.size || 0
        console.log()
        let fromCondition = true
        let toCondition = true

        if (fileSizeFrom.value !== null) {
          fromCondition = fileSize >= Number(fileSizeFrom.value)
        }

        if (fileSizeTo.value !== null) {
          toCondition = fileSize <= Number(fileSizeTo.value)
        }

        return fromCondition && toCondition
      })
    }

    return filtered
  })

  return {
    activeFilter,
    files,
    fileSizeFrom,
    fileSizeTo,
    setActiveFilter,
    setFileSizeFilter,
    clearSizeFilter,
    filteredFiles,
  }
})
