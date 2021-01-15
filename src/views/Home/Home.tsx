import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
// import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import CustomCountDown from './components/CustomCountDown'
import Icon_Tip from '../../assets/img/pro-tip-icon.svg'
import { START_REWARD_AT_BLOCK } from '../../sushi/lib/constants'
import BscxLogo from '../../assets/img/logo-icon.svg'
import CopyIcon from '../../assets/img/copy.png'
import FarmCards from '../Farms/components/FarmCards'
import TotalLockValue from './components/TotalLockValue'

const Home: React.FC = () => {
  var block = 99999999999
  const launchBlock = START_REWARD_AT_BLOCK
  const [atDate, setDate] = useState<any>()

  function useQuery() {
    const { search } = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery()
  let referral = query.get('referral')
  const { account } = useWallet()
  const siteUrl = 'http://launchpoolx.bscex.org/#/?referral='

  if (referral) {
    localStorage.setItem('CACHE_BSCX_LAUNCHPOOLX_REFERRAL', referral)
  }

  return (
    <Page>
        <SpacerRes>
            <Spacer size="lg" />
            <StyledLogo>
                <img className="d-md-none" src={BscxLogo} height="120" style={{ marginTop: -4 }} />
            </StyledLogo>
        </SpacerRes>
        <Spacer size="lg" />
        <div style={{fontWeight: 'bold', fontSize: 22, color: '#ffffff'}}>
            BSCX Price: <span style={{color: '#F3BA2F', fontSize: 30}}>$<TotalLockValue /></span>
        </div>
        {account && <div style={{marginTop: '12px', fontWeight: 'normal', fontSize: 14, color: '#ffffff', display: 'flex', alignItems: 'center'}}>
            Your referral link: {account.substr(0, 5)}...{account.substr(account.length - 5, 5)}
            <CopyToClipboard text={siteUrl + account}>
              <span><img title="Copy" src={CopyIcon} height="26" style={{ cursor: 'pointer', marginLeft: '6px' }} /></span>
            </CopyToClipboard>
        </div>}
        {block < launchBlock && atDate && <>
            <Spacer size="sm" />
            <CustomCountDown date={atDate}/>
            <Spacer size="md" />
            <div>
                <ReadMore href="https://t.me/bscexann" target="__blank"> 👉&nbsp;&nbsp;Read The Announcement&nbsp;&nbsp;👈</ReadMore>
            </div>
            <Spacer size="lg" />
            </>
        }
        {block >= launchBlock && <>
            <Spacer size="lg" />
            <Container>
                <Balances />
            </Container>
            <Spacer size="md" />
            <div>
                <ReadMore href="https://t.me/bscexann" target="__blank"> 👉&nbsp;&nbsp;Read The Announcement&nbsp;&nbsp;👈</ReadMore>
                <div style={{color: 'rgb(255,255,255,0.6)', textAlign: 'center', marginTop: 5}}>Do not complain if you don't</div>
            </div>
            {/*<Spacer size="lg" />*/}
            </>
        }
        <Spacer size="lg" />
        <Container size = "lg">
            <div style={{
                border: '1px solid #2C3030'
                }}>
            </div>
        </Container>
        <Box className="mt-4">
            <StyledHeading>SELECT YOUR FIELDS</StyledHeading>
            <Spacer size="lg" />
            <FarmCards />
        </Box>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.white};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  display: flex;
  align-items: start;
  justify-content: center;
  > img{
    width: 20px;
    margin-right: 3px;
  }
  b {
    color: ${(props) => props.theme.color.primary.main};
  }
`
const StyledHeading = styled.h2`
  color: ${(props) => props.theme.color.white};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 0;
  margin-top: 0;
`
const StyledParagraph = styled.p`
  color: ${(props) => props.theme.color.grey[100]};
  text-align: center;
  margin-top: 10px;
`

const ReadMore = styled.a`
  text-decoration: none;
  font-weight: bold;
  color: #ffffff;
  display: inline-block;
  padding: 5px 20px;
  border-radius: 5px;
  border: 1px solid #f6ea0370;
  background: #ffec0b0d;
  font-size: 14px;
  margin-top: 10px;
`

const StyledLogo = styled.div`
    .d-md-none {
        @media (max-width: 1024px) {
            display: none;
        }
    }
    .d-lg-none {
        @media (min-width: 1025px) {
            display: none;
        }
    }
`

const Box = styled.div`
    &.mt-4 {
        margin-top: 40px;
        @media (max-width: 767px) {
            margin-top: 30px;
        }
    }
`
const SpacerRes = styled.div`
    .sc-iCoHVE {
        @media (max-width: 1024px) {
            display: none;
        }
    }
    .d-lg-none {
        @media (min-width: 1025px) {
            display: none;
        }
    }
`
export default Home
