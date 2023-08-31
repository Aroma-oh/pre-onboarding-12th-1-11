import * as S from 'styles/Issue.styled';
import IssueItem from 'components/IssueItem';
import ListAd from 'components/ListAd';
import Tag from 'components/Tag';
import { useInfiniteScroll } from 'hooks/useIntersectionObserver';
import { useRef, useState } from 'react';
import { getIssuesList } from 'apis/issues';
import LoadingSpinner from 'components/LoadingSpinner';
import { memo } from 'react';

import { issueListState } from 'recoil/atoms';
import { useRecoilState } from 'recoil';

const ListContainer = () => {
  const [latestData, setLatestData] = useRecoilState(issueListState);
  const [pending, setPending] = useState(false);

  const pageRef = useRef(0);

  const fetchData = async () => {
    setPending(false);
    const response = await getIssuesList(pageRef.current);
    setLatestData((prev) => [...prev, ...response.data]);
    setPending(true);
  };

  const moreFetchData = async () => {
    if (pending) return;
    pageRef.current = pageRef.current + 1;

    console.info(pageRef.current); // 제거 예정
    console.info(pending)

    await fetchData();
  }

  const scrollRef = useInfiniteScroll(moreFetchData);

  console.info('ListContainer render'); // 뒤로가기로 와도 리렌더링됨

  return (
    <S.ListContainerStyled>
      <Tag>Issues List</Tag>
      {latestData.map((data, index) => (
        <div key={index}>
          < IssueItem
            number={data.number}
            title={data.title}
            userName={data.user.login}
            createdAt={data.created_at}
            comments={data.comments}
          />
          {(index + 1) % 4 === 0 && <ListAd />}
        </div>
      ))}
      {pending && <LoadingSpinner />}
      <div className='scroll-ref' ref={scrollRef} />

    </S.ListContainerStyled >
  )
};

export default memo(ListContainer);
