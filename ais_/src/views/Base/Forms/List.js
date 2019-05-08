import React, { Component } from 'react';
import {
  Col,
  Row,
  Table,
  Button,
} from 'reactstrap';
import * as moment from 'moment';
import 'moment/locale/ru';



class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formsdata:[],
      accomp_sheet: -1,
      briefcase: -1,
      form_number: -1,
      formId: -1,
      form_id: -1,
      created: '',
    };
  }

  async FetchData() {
    await fetch(`http://localhost:8000/form_1`)
        .then(response => response.json())
        .then(data => {
          this.setState({formsdata: data.data});
          console.log(this.state.formsdata) 
        })
        .catch(error => console.error(error))
  } 

  
  componentDidMount(){
    this.FetchData();
  }

  tabtoggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {

    return (
      <Row>
        <Col sm="12">
          <Table className="table-outline mb-0 d-none d-sm-table" responsive hover bordered size="sm">
            <thead className="thead-light">
              <tr>
                <th scope="col"></th>
                <th scope="col">№ листа</th>
                <th scope="col">№ портфеля</th>
                <th scope="col">№ переписного отдела</th>
                <th scope="col">№ инструкторского участка</th>
                <th scope="col">№ счетного участка</th>
                <th scope="col">№ формы</th>
                <th scope="col">Код СОАТЕ</th>
                <th scope="col">Создан</th>
              </tr>
            </thead>
            <tbody>
              {this.state.formsdata.map((form, index) =>
                <tr key={form.id.toString()}>
                  <td>
                    <Button name="Edit" id={form.id.toString()} className="fa fa-pencil btn-square" size="sm" color="primary" onClick={() => { this.props.toggleEdit(form.id)}} ></Button>{' '}
                    <Button name="Del" id={form.id.toString()} className="fa fa-minus btn-square" size="sm" color="danger" onClick={this.toggleDelete}></Button>
                  </td>
                  <td>{form.sheet}</td>
                  <td>{form.briefcase}</td>
                  <td>{form.dept_no}</td>
                  <td>{form.instructor_sector_no}</td>
                  <td>{form.counting_sector_no}</td>
                  <td>{form.form_number !== undefined  ? `Форма - ${form.form_number}` : ''}</td>
                  <td>{form.nsc_soate_code}</td>
                  <td>{moment(form.created).format('DD-MM-YYYY HH:MM')}</td>
                </tr>
                // <formRow key={index} form={form}/>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

export default List;
