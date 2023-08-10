import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateDataApi } from '../../../api/updateDataAPI'
import { APIStatus } from '../../../lib/axiosAPI'
import { verificationActionCreators } from '../../../slices/vizitnicaSlice'


export const useUpdateAvatar = () => {
  const [status, setStatus] = useState(APIStatus.Initial)
  const { updateAvatar } = updateDataApi()
  const {setAvatarPicId, setAvatarPic } = verificationActionCreators()

  const { token } = useSelector(state => state.authentication);


  const fetch = useCallback((args) => {
    setStatus(APIStatus.Loading)
    updateAvatar({
      onSuccess: (response) => {
        setStatus(APIStatus.Success)
        setAvatarPicId(response.data.id)
        setAvatarPic(response.url)

      },
      onError: () => {
        setStatus(APIStatus.Failure)
      },
      payload: args.formData,
      token,

    })

  }, [])

  return { fetch, status }
}
