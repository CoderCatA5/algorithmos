
import Clock from "./components/Clock";
import Grid from "./components/Grid";
import Display from "./components/Display";
import Form from "./components/Form";
const appStyle = {
  height: '1200px',
  display: 'flex',
  background: '#212121'
};

const App = () => {
  const handleSubmit = data => {
      const json = JSON.stringify(data, null, 4);
      console.clear();
      console.log(json);
  };
  return (
    <div>
      <div style={appStyle}>
        <Form onSubmit={handleSubmit} />
      </div>
      <div>
        <Display/>
      </div>
      <div>
        <Grid/>
      </div>
    </div>
  );
};

export default App;
