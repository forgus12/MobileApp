import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { businessCardsApi } from '../../../api/businessCardsApi'
import { APIStatus } from '../../../lib/axiosAPI'
import { useGetBusinessCards } from './useGetBusinessCards'



export const useDeleteSpecById = () => {

  const  [status, setStatus ] = useState(APIStatus.Initial)
  const { deleteSpecCardById } = businessCardsApi()
  const { token } = useSelector((s: RootState) => s?.authentication);
  const {fetch: fetchAllCards} = useGetBusinessCards()



  const fetch = useCallback((args) => {
    deleteSpecCardById({
      onSuccess: (res) => {
        setStatus(APIStatus.Success)
        fetchAllCards()
      },
      onError: (err) => {
        setStatus(APIStatus.Failure)
      },
      id: args?.id,
      token: token,
      ...args,
    })

  }, [])

  return { fetch, status }
}
