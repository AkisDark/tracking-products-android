import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSWR from 'swr';
import axios from 'axios';

const TableProduct = ({ productId }) => {
  const [storedUrl, setStoredUrl] = useState('http://192.168.1.4/api');

  useEffect(() => {
    const getStoredUrl = async () => {
      try {
        const storedUrl = await AsyncStorage.getItem('userUrl');

        setStoredUrl(storedUrl)
        if (!storedUrl) {
          router.replace('/')
        }
      } catch (error) {
        console.error('Error retrieving URL from local storage:', error);
      }
    };

    getStoredUrl();
  }, [AsyncStorage.getItem('type')]);

  const [Prices, setPrices] = useState([])
  const [page, setPage] = useState(1)
  const [key, setKey] = useState(`${storedUrl}/products?page=${page}&filter[id]=${productId}&include=prices`)

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR(key, fetcher);

  useEffect(() => {
    if (data?.data[0]?.prices) {
      const filteredPrices = data.data[0].prices.map(item => ({
        state_name: item.state_name,
        wholesale_price: `${item.wholesale_price}`,
        retail_price: item.retail_price
      }));
      setPrices(filteredPrices);
    }
  }, [data?.data]);


  const tableHead = ['الولاية', 'الجملة', 'التجزئة'];


  const alertIndex = (index) => {
    Alert.alert(`This is row ${index + 1}`);
  };

  const renderElement = (data, index) => (
    <TouchableOpacity onPress={() => alertIndex(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView vertical={true} >
      <View style={styles.container}>
        <Table borderStyle={{ borderColor: 'transparent' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          {Prices?.map((rowData, rowIndex) => (
            <TableWrapper key={rowIndex} style={styles.row}>
              {Object.values(rowData).map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={cellIndex === 3 ? renderElement(cellData, rowIndex) : cellData}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6, textAlign: "center" },
  row: { flexDirection: 'row', },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

export default TableProduct;
