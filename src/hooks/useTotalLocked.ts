import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getTotalUserLocked, getMasterChefContract } from '../sushi/utils'
import useSushi from './useSushi'
import useFarms from './useFarms'

const useTotalLocked = () => {
  const [totalLocked, setTotalLocked] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const [farms] = useFarms()

  const masterChefContract = getMasterChefContract(sushi)
  const fetchTokenLocked = useCallback(async () => {
    const tokenLockeds: any = await Promise.all(
      farms.map(
        ({
          pid
        }: {
          pid: number
        }) =>
          getTotalUserLocked(masterChefContract, account, pid)
      )
    )

    let total = 0
    tokenLockeds.map((item: any) => {
      total += Number(item)
    })

    setTotalLocked(new BigNumber(total))
  }, [masterChefContract, account])

  useEffect(() => {
    if (account && masterChefContract) {
      fetchTokenLocked()
    }
  }, [masterChefContract, setTotalLocked, account])

  return totalLocked
}

export default useTotalLocked
