import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const InfoList = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 15px;
  & p:first-child {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
`;
const InfoBox = styled.div`
  color: ${(props) => props.theme.textColor};
  text-align: center;
`;

const CoinDesc = styled.div`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 2rem;
  padding: 1rem;
  line-height: 1.5rem;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 15px;
  width: 10rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  proof_type: string;
  whitepaper: {
    link: string;
    thumbnail: string;
  };
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId! as string)
  );
  const {state} = useLocation();
  const {pathname} = useLocation();
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinInfo(coinId! as string),
    {
      refetchInterval: 60000,
    }
  );

  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <InfoList>
            <InfoBox>
              <p>RANK:</p>
              <p>{priceData?.rank}</p>
            </InfoBox>
            <InfoBox>
              <p>SYMBOL:</p>
              <p>${infoData?.symbol}</p>
            </InfoBox>
            <InfoBox>
              <p>OPEN SOURCE:</p>
              <p>{infoData?.open_source.toString()}</p>
            </InfoBox>
          </InfoList>
          <CoinDesc>{infoData?.description}</CoinDesc>
          <InfoList>
            <InfoBox>
              <p>Proof Type :</p>
              <p>{priceData?.proof_type}</p>
            </InfoBox>
            <InfoBox>
              <p>White Paper:</p>
              <a href={priceData?.whitepaper.link}>
                {priceData?.whitepaper.link ? "Click to look" : null}
              </a>
            </InfoBox>
          </InfoList>

          <Tabs>
            <Tab isActive={pathname.split('/')[2] === 'chart'}>
              <Link to={`chart`}>Chart</Link>
            </Tab>
            <Tab isActive={pathname.split('/')[2] === 'price'}>
              <Link to={`price`}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet context={coinId} />
        </>
      )}
    </Container>
  );
}

export default Coin;
