import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Input,
  Form,
  FormGroup,
  Button
} from 'reactstrap';
import InputMask from 'react-input-mask';
import classnames from 'classnames';
import List from './List';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import Form5 from './Form5';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formname: 'form13',
      savebtn: false,
      forms: {
        form1: {
          formname: 'form1',
          formdata: {
            dept_no: null,
            instructor_sector_no: null,
            counting_sector_no: null,
            region: null,
            district: null,
            town: null,
            city_district: null,
            township: null,
            microdistrict: null,
            settlment: null,
            village: null,
          },
          persons: [
            [1, null, null, null, null, null, null, null, null, null, null]
          ]
        },
        form2: [
          {
            formname: 'form2_0',
            formdata: {}
          }
        ],
        form3: {
          formname: 'form3',
          formdata: {}
        },
        form4: [
          {
            formname: 'form4_0',
            formdata: {}
          }
        ],
        form5: [
          {
            formname: 'form5_0',
            formdata: {}
          }
        ],
      },
      formId: -1,
      activeTab: 'form13',
      dept_no: null,
      instructor_sector_no: null,
      counting_sector_no: null,
      sheet: null,
      briefcase: null,
      nsc_soate_code: null,
      region: '',
      district: '',
      town: '',
      city_district: '',
      township: '',
      microdistrict: '',
      settlment: '',
      village: '',
      city: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.tabtoggle = this.tabtoggle.bind(this);
  }

  componentDidMount() {
    document.getElementById('dept_no').focus();
    document.getElementById('dept_no').select();
  }

  updatetab = (tab) => {
    this.tabtoggle(tab)
  }

  onKeyPressed(e) {
    if (e.keyCode === 13 || e.keyCode === 40) {

      // console.log(e.parent;
      const form = e.target.form;
      // console.log(form.elements)
      const index = Array.prototype.indexOf.call(form, e.target);
      // if (index <= form.elements.length - 2) {
      form.elements[index + 1].focus();
      // form.elements[index + 1].select();
      // }
      e.preventDefault();
      const posf = this.state.activeTab.indexOf('_')
      const formnm = this.state.activeTab.substring(0, posf !== -1 ? posf : this.state.activeTab.length)
      /////////////////////////////////// переходы
      if (formnm === 'form2' && e.target.name === 'resident_from_birth' && e.target.value === '1') {
        form.elements[index + 10].focus();
        form.elements[index + 10].select();
      }
      if (formnm === 'form2' && e.target.name === 'marital_status' && (e.target.value !== '2' && e.target.value !== '3')) {
        form.elements[index + 2].focus();
        form.elements[index + 2].select();
      }
      if (formnm === 'form2' && e.target.name === 'longterm_resident_abroad' && e.target.value !== '1') {
        form.elements[index + 4].focus();
        form.elements[index + 4].select();
      }
      if (formnm === 'form2' && e.target.name === 'education_level' && e.target.value <= '3' && e.target.value !== '10') {
        form.elements[index + 2].focus();
        form.elements[index + 2].select();
      }
      if (formnm === 'form2' && e.target.name === 'education_now' && e.target.value === '2') {
        form.elements[index + 3].focus();
        form.elements[index + 3].select();
      }
      if (formnm === 'form2' && e.target.name === 'work_or_business_now' && e.target.value === '2') {
        form.elements[index + 9].focus();
        form.elements[index + 9].select();
      }
      if (formnm === 'form2' && e.target.name === 'work_status' && e.target.value !== '2') {
        form.elements[index + 3].focus();
        form.elements[index + 3].select();
      }
      if (formnm === 'form2' && e.target.name === 'work_status_1' && e.target.value !== '2.1') {
        form.elements[index + 2].focus();
        form.elements[index + 2].select();
      }
      if (formnm === 'form2' && e.target.name === 'work_place' && e.target.value === '1') {
        form.elements[index + 3].focus();
        form.elements[index + 3].select();
      }
      if (formnm === 'form2' && e.target.name === 'work_other_place' && e.target.value !== '2.3') {
        form.elements[index + 2].focus();
        form.elements[index + 2].select();
      }
      if (formnm === 'form2' && e.target.name === 'work_search' && e.target.value === '2') {
        form.elements[index + 2].focus();
        form.elements[index + 2].select();
      }
      if (formnm === 'form2' && e.target.name === 'opportunity_work' && e.target.value === '1') {
        form.elements[index + 2].focus();
        form.elements[index + 2].select();
      }
      if (formnm === 'form3' && e.target.name === 'type_living_room' && e.target.value > '3') {
        form.elements[index + 23].focus();
        form.elements[index + 23].select();
      }
      if (formnm === 'form3' && e.target.name === 'living_occupation' && e.target.value === '3') {
        form.elements[index + 22].focus();
        form.elements[index + 22].select();
      }
      if (formnm === 'form3' && e.target.name === 'computer' && e.target.value === '2') {
        form.elements[index + 2].focus();
        form.elements[index + 2].select();
      }
      if (formnm === 'form4' && e.target.name === 'marital_status' && (e.target.value !== '2' && e.target.value !== '3')) {
        form.elements[index + 2].focus();
        form.elements[index + 2].select();
      }      
      // console.log(formnm)
    }

    if (e.keyCode === 38) {
      console.log(e.keyCode);
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      if (index > 0) {
        form.elements[index - 1].focus();
        form.elements[index - 1].select();
      }
      e.preventDefault();
    }
    if (e.keyCode === 107) {
      if (this.state.activeTab === 'form13') {
        this.tabtoggle('form1')
      }
      e.preventDefault();
    }

  }

  async handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
    if (name === "dept_no") {
      let f1data = this.state.forms.form1.formdata
      f1data.dept_no = event.target.value
      this.setState({ form1data: f1data })
      this.setState({ form2data: f1data })
      this.setState({ form4data: f1data })
      this.setState({ form5data: f1data })
    }
    if (name === "instructor_sector_no") {
      let f1data = this.state.forms.form1.formdata
      f1data.instructor_sector_no = event.target.value
      this.setState({ form1data: f1data })
    }
    if (name === "counting_sector_no") {
      let f1data = this.state.forms.form1.formdata
      f1data.counting_sector_no = event.target.value
      this.setState({ form1data: f1data })
    }
    if (name === "nsc_soate_code") {
      document.getElementById("nsc_soate_val").innerHTML = "";
      let fcode;
      const soate_code = event.target.value;
      const length = soate_code.length;
      if (length >= 5) {
        fcode = soate_code.padEnd(14, '0')
        await fetch(`http://localhost:8000/soate/code/${fcode}`)
          .then(response => response.json())
          .then(data => {
            console.log(data.data)
            if (data.data.length > 0) {
              document.getElementById("nsc_soate_val").innerHTML = data.data[0].parent //+ ', ' + data.data[0].name
              switch (length) {
                case 5:
                  this.setState({ region: data.data[0].parent })
                  break
                case 8:
                  if (data.data[0].parent.indexOf('Города') === -1) {
                    this.setState({ district: data.data[0].parent })
                  } else {
                    this.setState({ district: '' })
                    let f1data = this.state.forms.form1.formdata
                    f1data.district = ''
                    this.setState({ form1data: f1data })
                    this.setState({ city: true })
                  }
                  break
                case 11:
                  if (data.data[0].parent.indexOf('Города') === -1) {
                    this.setState({ settlment: data.data[0].parent })
                    let f1data = this.state.forms.form1.formdata
                    f1data.settlment = data.data[0].parent
                    this.setState({ form1data: f1data })
                  } else {
                    this.setState({ settlment: '' })
                    let f1data = this.state.forms.form1.formdata
                    f1data.settlment = ''
                    this.setState({ form1data: f1data })
                    this.setState({ city: true })
                  }
                  break
                case 13:
                  console.log(this.state.city)
                  if (this.state.city) {
                    this.setState({ town: data.data[0].parent })
                    
                  } else {
                    this.setState({ village: data.data[0].parent })
                    
                  }
                  break
                default:
              }
            } else {
              if (length > 13) {
                this.setState({ region: '', district: '', settlment: '', village: '', town: '', city: false })
              }
            }
          })
          .catch(error => console.error(error))
      } else {
        this.setState({ region: '', district: '', settlment: '', village: '', town: '', city: false })
      }


      // this.setState({ formdata: f1data })
    }
    console.log(this.state)
  }

  handleSubmit() {
    console.log(this.state.activeTab)
    this.submitForms()
  }

  tabtoggle(tab) {
    console.log(tab)
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  async submitForms() {
    console.log(this.state)
    let insertid = 0
    // event.preventDefault();
    await fetch(`http://localhost:8000/form_1`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(this.state.form1data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        insertid = data.data.insertId
      })
      .catch(error => console.error(error))
    const f13data = {
      dept_no: this.state.dept_no,
      instructor_sector_no: this.state.instructor_sector_no,
      counting_sector_no: this.state.counting_sector_no,
      sheet: this.state.sheet,
      briefcase: this.state.briefcase,
      nsc_soate_code: this.state.nsc_soate_code,
      form_number: 1,
      form_id: insertid
    };
    if (insertid !== 0) {
      await fetch(`http://localhost:8000/forms`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(f13data)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => console.error(error))
      this.state.forms.form1.persons.map(async (person, index) => {
        const pdata = {
          form_1_id: insertid,
          person_id: person[0],
          household_no: person[1],
          person_no: person[2],
          temp_absent_district: person[3],
          absense_length: person[4],
          absense_reason: person[5],
          temp_resident_permanent_district: person[6],
          temp_resident_absense_length: person[7],
          temp_resident_absense_reason: person[8],
          exists_longterm_household_member_absent: person[9],
          is_visitor: person[10],
        }
        await fetch(`http://localhost:8000/form_1_persons`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(pdata)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
          .catch(error => console.error(error))
        this.state.forms.form2.map(async (dataform2, index) => {

          await fetch(`http://localhost:8000/form_2`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(dataform2.formdata)
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              console.log(JSON.stringify(dataform2.formdata))
            })
            .catch(error => console.error(error))
        })
        this.state.forms.form4.map(async (dataform4, index) => {
          await fetch(`http://localhost:8000/form_4`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(dataform4.formdata)
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              insertid = data.data.insertId
            })
            .catch(error => console.error(error))
        })
        this.state.forms.form5.map(async (dataform5, index) => {
          await fetch(`http://localhost:8000/form_2`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(dataform5.formdata)
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              insertid = data.data.insertId
            })
            .catch(error => console.error(error))
        })
        await fetch(`http://localhost:8000/form_3`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(this.state.forms.form3.formdata)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            insertid = data.data.insertId
          })
          .catch(error => console.error(error))
        return console.log(person)
      })
    }
  }

  async toggleEdit(e) {
    console.log(e)
    // this.toggleInput();
    await fetch(`http://localhost:8000/forms/id/${e}`)
      .then(response => response.json())
      .then(data => {
        // this.setState({usersdata: data.data});
        console.log(data.data)
        const fsdata = data.data[0]
        this.setState({
          id: fsdata.id,
          form_id: fsdata.form_id,
          activeTab: 'form13',
          dept_no: fsdata.dept_no,
          instructor_sector_no: fsdata.instructor_sector_no,
          counting_sector_no: fsdata.counting_sector_no,
          sheet: fsdata.sheet,
          briefcase: fsdata.briefcase,
          nsc_soate_code: fsdata.nsc_soate_code,
        });
      })
      .catch(error => console.error(error))
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card onKeyDown={(e) => this.onKeyPressed(e)} >
              <CardHeader>Ввод данных</CardHeader>
              <CardBody>
                <Form id="forms">
                  <Nav tabs key="child">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 'form13' })}
                        onClick={() => { this.tabtoggle('form13'); }}
                      >
                        Сопроводительный лист
                    </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 'form1' })}
                        onClick={() => { this.tabtoggle('form1'); }}
                      >
                        Форма 1
                    </NavLink>
                    </NavItem>
                    {this.state.forms.form2.map((data, index) =>
                      <NavItem key={`form2_${index}`}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === `form2_${index}` })}
                          onClick={() => { this.tabtoggle(`form2_${index}`); }}
                        >
                          {`Форма 2 - ${index + 1}`}
                        </NavLink>
                      </NavItem>
                    )}
                    {this.state.forms.form4.map((data, index) =>
                      <NavItem key={`form4_${index}`}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === `form4_${index}` })}
                          onClick={() => { this.tabtoggle(`form4_${index}`); }}
                        >
                          {`Форма 4 - ${index + 1}`}
                        </NavLink>
                      </NavItem>
                    )}
                    {this.state.forms.form5.map((data, index) =>
                      <NavItem key={`form5_${index}`}>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === `form5_${index}` })}
                          onClick={() => { this.tabtoggle(`form5_${index}`); }}
                        >
                          {`Форма 5 - ${index + 1}`}
                        </NavLink>
                      </NavItem>
                    )}
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 'form3' })}
                        onClick={() => { this.tabtoggle('form3'); }}
                      >
                        Форма 3
                    </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 'list' })}
                        onClick={() => { this.tabtoggle('list'); }}
                      >
                        Список
                    </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="form13">
                      <Row>
                        <Col md={4}>
                          <Table size="sm" bordered responsive>
                            <thead>
                              <tr>
                                <th rowSpan="2">№ переписного отдела</th>
                                <th rowSpan="2">№ инструкторского участка</th>
                                <th rowSpan="2">№ счетного участка</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Input
                                    onChange={(e) => this.handleChange(e)}
                                    bsSize="sm"
                                    type="text"
                                    mask="999"
                                    maskChar=""
                                    tag={InputMask}
                                    name="dept_no"
                                    id="dept_no"
                                  />
                                </td>
                                <td>
                                  <Input
                                    onChange={(e) => this.handleChange(e)}
                                    bsSize="sm"
                                    type="text"
                                    mask="999"
                                    maskChar=""
                                    tag={InputMask}
                                    name="instructor_sector_no"
                                    id="instructor_sector_no"
                                  />
                                </td>
                                <td>
                                  <Input
                                    onChange={(e) => this.handleChange(e)}
                                    bsSize="sm"
                                    type="text"
                                    mask="99"
                                    maskChar=""
                                    tag={InputMask}
                                    name="counting_sector_no"
                                    id="counting_sector_no"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                        <Col md={4}>
                          <Table size="sm" bordered responsive>
                            <tbody>
                              <tr>
                                <th style={{ width: "80%" }}>Сопроводительный лист №</th>
                                <td style={{ width: "20%" }}>
                                  <Input
                                    onChange={(e) => this.handleChange(e)}
                                    bsSize="sm"
                                    type="text"
                                    mask="999"
                                    maskChar=""
                                    tag={InputMask}
                                    name="sheet"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                        <Col md={4}>
                          <Table size="sm" bordered responsive>
                            <tbody>
                              <tr>
                                <th style={{ width: "80%" }}>
                                  № портфеля
                          </th>
                                <td style={{ width: "20%" }}>
                                  <Input
                                    onChange={(e) => this.handleChange(e)}
                                    bsSize="sm"
                                    type="text"
                                    mask="999"
                                    maskChar=""
                                    tag={InputMask}
                                    name="briefcase"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Table size="sm" bordered responsive>
                            <tbody>
                              <tr>
                                <th style={{ width: "20%" }}>
                                  Код ГК СОАТЕ
                                </th>
                                <td style={{ width: "20%" }}>
                                  <Input
                                    onChange={(e) => this.handleChange(e)}
                                    bsSize="sm"
                                    type="text"
                                    mask="417\09999999999"
                                    maskChar=""
                                    // value="4170"
                                    tag={InputMask}
                                    name="nsc_soate_code"
                                  />
                                </td>
                                <td id="nsc_soate_val" style={{ width: "60%" }}>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <Table size="sm" bordered responsive>
                        <tbody>
                          <tr>
                            <th style={{ width: "50%" }}>Область
                              <Input onChange={this.handleChange} bsSize="sm" type="text" name="region" value={this.state.region} disabled/></th>
                            <th style={{ width: "50%" }}>Район
                              <Input onChange={this.handleChange} bsSize="sm" type="text" name="district" value={this.state.district} disabled/></th>
                          </tr>
                          <tr>
                            <th style={{ width: "50%" }}>Город
                              <Input onChange={this.handleChange} bsSize="sm" type="text" name="town" value={this.state.town} disabled/></th>
                            <th style={{ width: "50%" }}>Поселок городского типа
                              <Input onChange={this.handleChange} bsSize="sm" type="text" name="township" value={this.state.township} disabled/></th>
                          </tr>
                          <tr>
                            <th style={{ width: "50%" }}>Внутригородской район
                              <Input onChange={this.handleChange} bsSize="sm" type="text" name="town" value={this.state.city_district} disabled/></th>
                            <th style={{ width: "50%" }}>Айылный аймак
                              <Input onChange={this.handleChange} bsSize="sm" type="text" name="township" value={this.state.settlment} disabled/></th>
                          </tr>
                          <tr>
                            <th style={{ width: "50%" }}>Наименование или номер городского микрорайона, жилмассива, новостройки
                              <Input onChange={this.handleChange} bsSize="sm" type="text" name="microdistrict" value={this.state.microdistrict} disabled/></th>
                            <th style={{ width: "50%" }}>Айыл (село)
                              <Input onChange={this.handleChange} bsSize="sm" type="text" name="village" value={this.state.village} disabled/></th>
                          </tr>
                        </tbody>
                      </Table>
                      {/* <Form1 formdata={this.state.form1data} persons={this.state.form1persons} /> */}
                    </TabPane>
                    <TabPane tabId="form1">
                      <Form1 tabupdate={this.updatetab} forms={this.state.forms} form1data={this.state.forms.form1.formdata} persons={this.state.forms.form1.persons} />
                    </TabPane>
                    {this.state.forms.form2.map((data, index) =>
                      <TabPane key={`form2_${index}`} tabId={`form2_${index}`}>
                        <Form2 tabupdate={this.updatetab} findex={index} data={this.state.forms.form2[index].formdata} />
                      </TabPane>
                    )}
                    {this.state.forms.form4.map((data, index) =>
                      <TabPane key={`form4_${index}`} tabId={`form4_${index}`}>
                        <Form4 tabupdate={this.updatetab} findex={index} data={this.state.forms.form4[index].formdata} />
                      </TabPane>
                    )}
                    {this.state.forms.form5.map((data, index) =>
                      <TabPane key={`form5_${index}`} tabId={`form5_${index}`}>
                        <Form5 tabupdate={this.updatetab} findex={index} data={this.state.forms.form5[index].formdata} />
                      </TabPane>
                    )}
                    <TabPane tabId="form3">
                      <Form3 tabupdate={this.updatetab} data={this.state.forms.form3.formdata} />
                    </TabPane>
                    <TabPane tabId="list">
                      <List tabupdate={this.updatetab} toggleEdit={this.toggleEdit} />
                    </TabPane>
                  </TabContent>
                </Form>
              </CardBody>
              <CardFooter>
                <FormGroup>
                  {this.state.activeTab !== 'list' ? <Button className="float-right" onClick={this.handleSave} color="primary" >Сохранить</Button> : null}
                  {this.state.activeTab !== 'list' ? <Button onClick={this.handleSubmit} color="danger" >Завершить</Button> : null}
                </FormGroup>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Forms;
