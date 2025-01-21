import React, {useState, useCallback} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native'; // useFocusEffect 가져오기
import RelayCard from '../components/RelayCard';

const SearchPage = () => {
  const [data, setData] = useState([]);

  const fetchData = useCallback(() => {
    const newData = [
      {
        id: '1',
        title: '안녕하세요',
        imageUrl:
          'https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg',
        count: 3,
        tags: ['어떻게이별까지사겟하이ㅏ힝', '하이하이하이하이하이'],
      },
      {
        id: '2',
        title: '반갑습니다',
        imageUrl:
          'https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg',
        count: 5,
        tags: [
          '반가가',
          '반갑반갑하이하이하이하이하이dfsdkfjsalfdsalkfjklsda하이',
        ],
      },
      {
        id: '3',
        title: '오늘은',
        imageUrl:
          'https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg',
        count: 2,
        tags: ['태그1', '태그2', '태그3'],
      },
      {
        id: '4',
        title: '즐거운 날',
        imageUrl:
          'https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg',
        count: 4,
        tags: ['태그1', '태그fsafd2', '태그xormxordfsmxorm3'],
      },
      {
        id: '5',
        title: '행복한 하루',
        imageUrl:
          'https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg',
        count: 1,
        tags: ['태그1', '태그2', '태그3'],
      },
      {
        id: '6',
        title: '기분 좋은 날',
        imageUrl:
          'https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg',
        count: 3,
        tags: ['태그1', '태그2', '태그3'],
      },
    ];

    // 상태 업데이트
    setData(newData);
  }, []); // fetchData는 처음 한 번만 실행되도록 useCallback으로 최적화

  // 탭활성화시마다 새로고침
  useFocusEffect(
    React.useCallback(() => {
      fetchData(); // 데이터 갱신
    }, [fetchData]), // fetchData가 변경될 때만 실행
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <RelayCard
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            count={item.count}
            tags={item.tags}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
});

export default SearchPage;
