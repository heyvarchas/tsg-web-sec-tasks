import { useState, useCallback } from 'react'
import {
  fetchPageInfo,
  fetchLastEditor,
  fetchSummary,
  fetchLinkedPages,
  fetchBacklinks,
  fetchPageViews,
  fetchUniqueEditors,
  fetchLanguageCount,
} from '../services/wikipediaApi'

const initialState = {
  data: null,
  loading: false,
  error: null,
}

export function useWikipediaData() {
  const [state, setState] = useState(initialState)

  // Main search function used by the component
  const search = useCallback(async (title) => {
    if (!title.trim()) return

    setState({ data: null, loading: true, error: null })

    try {
      // Run requests together to keep things fast
      const [
        pageInfo,
        lastEditor,
        summary,
        linkedPages,
        backlinks,
        pageViews,
        uniqueEditors,
        languageCount,
      ] = await Promise.all([
        fetchPageInfo(title),
        fetchLastEditor(title),
        fetchSummary(title),
        fetchLinkedPages(title),
        fetchBacklinks(title),
        fetchPageViews(title),
        fetchUniqueEditors(title),
        fetchLanguageCount(title),
      ])

      // Combine everything into a single result object
      setState({
        loading: false,
        error: null,
        data: {
          ...pageInfo,
          lastEditor,
          ...summary,
          linkedPages,
          backlinks,
          pageViews,
          uniqueEditors,
          languageCount,
        },
      })
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err.message ?? 'Something went wrong. Please try again.',
      })
    }
  }, [])

  // Clear current results
  const reset = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    search,
    reset,
  }
}