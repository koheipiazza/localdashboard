import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Link,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';

// APIのURLを環境に応じて切り替え
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://localdashboard.onrender.com'  // Renderのデプロイ済みURL
  : 'http://localhost:8000';

function App() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/feeds`);
        setFeeds(response.data);
        setLoading(false);
      } catch (err) {
        setError('フィードの取得中にエラーが発生しました');
        setLoading(false);
      }
    };

    fetchFeeds();
    // 5分ごとに更新
    const interval = setInterval(fetchFeeds, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <ChakraProvider>
        <Container maxW="container.xl" py={10}>
          <Text>読み込み中...</Text>
        </Container>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider>
        <Container maxW="container.xl" py={10}>
          <Text color="red.500">{error}</Text>
        </Container>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Box bg={bgColor} minH="100vh" py={10}>
        <Container maxW="container.xl">
          <Heading mb={8}>地域情報ダッシュボード</Heading>
          <VStack spacing={4} align="stretch">
            {feeds.map((item, index) => (
              <Box
                key={index}
                p={6}
                bg={cardBgColor}
                shadow="md"
                borderRadius="lg"
                _hover={{ transform: 'translateY(-2px)', transition: 'all 0.2s' }}
              >
                <HStack spacing={4} mb={2}>
                  <Badge colorScheme="blue">{item.source}</Badge>
                  {item.published_date && (
                    <Text fontSize="sm" color="gray.500">
                      {new Date(item.published_date).toLocaleString()}
                    </Text>
                  )}
                </HStack>
                <Link href={item.link} isExternal>
                  <Heading size="md" mb={2}>
                    {item.title}
                  </Heading>
                </Link>
                {item.description && (
                  <Text noOfLines={3} color="gray.600">
                    {item.description}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App; 