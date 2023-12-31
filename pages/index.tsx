
import Layout from '../components/layout';
import React, { useEffect } from 'react';
import Table, { AvatarCell, SpecialitiesCell } from '../components/Table';
import SearchModel from '../components/Home/SearchModel';
import { useQuery, gql } from '@apollo/client';

const HELLO_QUERY = gql`
  query {
    contractors {
      id
      name
      specialities
      availability
      day_rate
      color
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(HELLO_QUERY);
  /* if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; */

  const [rowResData, setData] = React.useState<string[]>([]);
  const [filterModel, setFilterModel] = React.useState(false);
  const [checkedRow, setCheckedRow] = React.useState<string[]>([]);


  const columns = React.useMemo(() => {
    return [
      
      {
        Header: "Name",
        accessor: 'name',
        Cell: AvatarCell
      },
      {
        Header: "Specialities",
        accessor: 'specialities',
        Cell: SpecialitiesCell
      },
      {
        Header: "Day Rate",
        accessor: 'day_rate',
      },
      {
        Header: "Availability",
        accessor: 'availability'
      },
    ]
  }, [])

  useEffect(() => {
    
    if(data && data.contractors && Array.isArray(data.contractors)){
      setData(data.contractors)
    }
  }, [loading]);


  const handleFilterModel = () => {
    setFilterModel(!filterModel);
  }

  return (
    <Layout>
      <div className='mx-auto max-w-5xl py-6 sm:px-6 lg:px-8 mt-20'>
        <div className="container mx-auto">
          <div className="mb-9">
            <p className="page-title">Contractors</p>
            <p className='page-description'>Lorem ipsum dolor sit amet consectetur. Lacus semper convallis non et vel nec sit proin. </p>
          </div>
          <div className="">
            {
              rowResData && rowResData.length > 0 && (<Table columns={columns}  checkedRow={checkedRow} handleFilterModel={handleFilterModel} setCheckedRow={setCheckedRow} data={rowResData} />)
            }

          </div>

        </div>
      </div>
      <SearchModel
        open={filterModel}
        handleFilterModel={handleFilterModel}
        data={rowResData}
      />
    </Layout>
  );
}

export default Home;