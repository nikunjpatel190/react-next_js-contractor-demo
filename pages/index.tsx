
import Layout from '../components/layout';
import React, { useEffect } from 'react';
import Table, { AvatarCell, SpecialitiesCell } from '../components/Table';
import SearchModel from '../components/Home/SearchModel';


const getData = async (checkedRow: string[], resHandle: any) => {
  // let dataRs = [];
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query: "{\n  contractors {\n    id\n    name\n    specialities\n    availability\n    day_rate\n    color\n  }\n}",
    variables: {}
  });


  /* let reData = await fetch("http://localhost:4000/graphql", {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  });

  if (reData.status == 200) {
    dataRs = await reData.json();
  } */

  let dataRs = {
    data:{contractors:[
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
  ]}};


  resHandle(dataRs?.data?.contractors?.map((it: any, index: number) => {
    if (checkedRow.includes(String(index))) it.checked = true;
    else it.checked = false;
    return it;
  }))

}

function Home() {

  const [data, setData] = React.useState([]);
  const [filterModel, setFilterModel] = React.useState(false);
  const [checkedRow, setCheckedRow] = React.useState<string[]>([]);

  const handleChecked = (checked: boolean, RowID: any) => {
    if (checked) {
      let checkedRowCh: any = checkedRow;
      if (!checkedRowCh.includes(RowID))
        checkedRowCh.push(RowID);
      setCheckedRow(checkedRowCh);
    } else {
      let checkedRowCh = checkedRow.filter((rv: any) => rv !== RowID);
      setCheckedRow(checkedRowCh);
    }
  }

  const columns = React.useMemo(() => {
    return [
      {
        Header: '',
        accessor: 'check',
        Cell: (RowData: any) => {

          return (
            <input type="checkbox" onChange={(e) => {
              handleChecked(e.target.checked, RowData.row.id)
            }} checked={checkedRow.includes(RowData.row.id) || RowData.row.checked} name='check' className="appearance-none checked:bg-blue-500" />
          )

        },
        disableSortBy: true
      },
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
  }, [checkedRow])

  useEffect(() => {
    getData(checkedRow, (resDt: any) => setData(resDt))
  }, []);

  useEffect(() => {
    // console.log(data, checkedRow, "data")
  }, [checkedRow, data]);


  const handleFilterModel = () => {
    setFilterModel(!filterModel);
  }

  // React.useCallback(() => getData(checkedRow, (resDt:any)=>setData(resDt)), [checkedRow]);

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
              data && data.length > 0 && (<Table columns={columns} handleChecked={handleChecked} checkedRow={checkedRow} handleFilterModel={handleFilterModel} setCheckedRow={setCheckedRow} data={data} />)
            }

          </div>

        </div>
      </div>
      <SearchModel
        open={filterModel}
        handleFilterModel={handleFilterModel}
        data={data}
      />
    </Layout>
  );
}

export default Home;