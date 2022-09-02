import { AppProvider } from '@shopify/polaris';
import './App.css';
import Nav from './components/header/Nav';
import DataTableExample from './components/Layouts/DataTable';
import FilterData from './components/Layouts/FilterData';
import SimpleIndexTableExample from './components/Layouts/IndexTable';
function App() {
  return (
    <AppProvider>
      <div className="App">
        <Nav />
        <FilterData />
        <SimpleIndexTableExample />
        <DataTableExample />
      </div>
    </AppProvider>
  );
}

export default App;