
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


/* const getData = async ( resHandle: any) => {
  console.log("----")
  let dataRs = {};
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query: "{\n  contractors {\n    id\n    name\n    specialities\n    availability\n    day_rate\n    color\n  }\n}",
    variables: {}
  });


  let reData = await fetch("http://localhost:4000/graphql", {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  });

  if (reData.status == 200) {
    dataRs = await reData.json();
  }

  console.log(dataRs?.data?.contractors, "dataRs?.data?.contractors")

  resHandle(dataRs?.data?.contractors)
  

} */

/* const rowResData = [
    
  {
    "id": "1",
    "name": "Strykes",
    "specialities": [
      "Surgery",
      "Medical"
    ],
    "availability": "Yes",
    "day_rate": "$ 300,00",
    "color": "#3F893E"
  },
  {
    "id": "2",
    "name": "Rossonerri",
    "specialities": [
      "Healthcare",
      "Fitness"
    ],
    "availability": "No",
    "day_rate": "$ 250,00",
    "color": "#3E4589"
  },
  {
    "id": "3",
    "name": "Tyga",
    "specialities": [
      "Surgery",
      "Medical"
    ],
    "availability": "Yes",
    "day_rate": "$ 199,00",
    "color": "#883E89"
  },
  {
    "id": "4",
    "name": "Yolo.corp",
    "specialities": [
      "Automotive",
      "Modification"
    ],
    "availability": "Yes",
    "day_rate": "$ 200,00",
    "color": "#89863E"
  },
  {
    "id": "5",
    "name": "Bardi",
    "specialities": [
      "Technology",
      "Home Living"
    ],
    "availability": "No",
    "day_rate": "$ 100,00",
    "color": "#893E3E"
  }
]; */

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

  // React.useCallback(() => getData((resDt:any)=>setData(resDt)), []);

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