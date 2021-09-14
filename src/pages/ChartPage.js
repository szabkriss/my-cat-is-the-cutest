function ChartPage() {

    return (
      <div className="ChartPage">
        <h1>Chart Page</h1>
        <div
        style={{
          backgroundImage: `url(https://quickchart.io/chart?c={type:'bar',data:{labels:['Q1','Q2','Q3','Q4'], datasets:[{label:'Users',data:[50,60,70,180]},{label:'Revenue',data:[100,200,300,400]}]}})`
        }}>

        </div>
      </div>
    );
  }
  
  export default ChartPage;