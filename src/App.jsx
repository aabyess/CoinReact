import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Typography, Spin, Alert } from "antd";
import axios from "axios";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets")
      .then((res) => {
        const filtered = res.data.filter((coin) => coin.amount > 0);
        setAssets(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
        Ebisu의 빗썸 코인현황
      </Header>

      <Content style={{ padding: "24px" }}>
        <Title level={3}>보유 중인 코인</Title>

        {loading && <Spin size="large" />}
        {error && <Alert message={error} type="error" />}

        <Row gutter={[16, 16]}>
          {assets.map((coin) => (
            <Col xs={24} sm={12} md={8} key={coin.ticker}>
              <Card title={coin.ticker} variant="outlined">
  <p>보유량: {coin.amount.toLocaleString()}</p>
  <p>
    평가 금액: ₩
    {coin.valuation.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}
  </p>
</Card>

            </Col>
          ))}
        </Row>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        © 2025 CoinReact - Powered by Flask & React
      </Footer>
    </Layout>
  );
}

export default App;
