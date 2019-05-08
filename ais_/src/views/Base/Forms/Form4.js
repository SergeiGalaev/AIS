import React, { Component } from 'react';
import {
  Input,
  Col,
  Row,
  Table,
} from 'reactstrap';
import InputMask from 'react-input-mask';
import * as moment from 'moment';
import 'moment/locale/ru';
import variants from './Variants';

class InputRow extends React.Component {
  render() {
    return (
      <tr>
        <th style={{ width: "55%" }}>
          {this.props.label}
        </th>
        <td style={{ width: "15%" }}>
          <Input onChange={this.props.onChange} bsSize="sm" type="text" mask={this.props.mask} maskChar={this.props.mchar} tag={InputMask} name={this.props.name} value={this.props.value || ''} findex={this.props.findex} disabled={this.props.disabled} invalid={this.props.invalid} />
        </td>
        <td id={`sval4_${this.props.name}_${this.props.findex}`} style={{ width: "30%" }}>
        </td>
      </tr>
    )
  }
}

class Form4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form4data: {
        dept_no: null,
        instructor_sector_no: null,
        counting_sector_no: null,
        resident_list_no: null,
        household_no: null,
        person_no: null,
        surname: null,
        first_name: null,
        middle_name: null,
        relationship_type: null,
        parent_no: null,
        gender: null,
        residence_type: null,
        birthdate: null,
        age: '',
        marital_status: null,
        spouse_no: null,
        nationality: null,
        country_born_id: null,
        citizenship: null,
        mother_tounge: null,
      },
    };
    this.handleChange = this.handleChange.bind(this);

  }

  // componentDidMount() {
  //   this.props.data.push(this.state.form4data)
  // }

  handleChange(event) {
    console.log(this.state)
    console.log(event)
    const name = event.target.name;
    let keyval = event.target.value;
    let flength = 0;
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    if (keyval.substr(keyval.length - 1, 1) === '.') keyval = keyval.substring(0, keyval.length - 1)
    let fdata = this.state.form4data
    fdata[name] = keyval
    if (variants.f4variants[name]) {
      let find = false
      const lastval = variants.f4variants[name][variants.f4variants[name].length - 1][0]
      flength = lastval.length
      const maxval = typeof lastval === 'number' ? lastval : 99999
      if (parseInt(keyval) > maxval || keyval === '0') {
        let newval = keyval.substring(0, keyval.length - 1)
        fdata[name] = newval
        keyval = this.state.form4data[name]
      }
      
      for (let ind = 0; ind < variants.f4variants[name].length; ind++) {
        let curr_value = variants.f4variants[name][ind][0]
        curr_value = name === 'economic_activity' ? curr_value : parseFloat(curr_value)
        const keyvals = name === 'economic_activity' ? keyval : parseFloat(keyval)
        if (curr_value === keyvals) {
          find = true
          document.getElementById(`sval4_${name}_${this.props.findex}`).innerHTML = variants.f4variants[name][ind][1]
          break;
        } else {
          document.getElementById(`sval4_${name}_${this.props.findex}`).innerHTML = ''
        }
      }
      if (!find && flength === keyval.length) {
        fdata[name] = ''
        document.getElementById(`sval4_${name}_${this.props.findex}`).innerHTML = ''
        keyval = ''//this.state.form5data[name]
      }
    }

    if (name === 'birthdate') {
      if (keyval.length === 10) {
        const bdate = moment(keyval, 'DD-MM-YYYY').toDate();
        if (bdate) {
          const years = moment('25-03-2019', 'DD-MM-YYYY').diff(bdate, 'years', false);
          if (years >= 0) {
            fdata['age'] = years.toString()
            form.elements[index + 2].focus();
            form.elements[index + 2].select();
          }
        } else {
          fdata['age'] = 'Ошибка!'
        }
      } else {
        fdata['age'] = 'Ошибка!'
      }
      this.props.data.age = fdata['age']


    }
    this.setState({ form4data: fdata })
    event.preventDefault()
    console.log(this.props)
    this.props.data[name] = keyval
    console.log(this.state.fvalue)

    console.log(event.target.value)

  }




  render() {

    return (
      <Row>
        <Col sm="12">
          {/* <Form id="f4"> */}
          <Row >
            <Col md={6}>
              <Table size="sm" bordered>
                <thead>
                  <tr>
                    <th rowSpan="2">№ переписного отдела</th>
                    <th rowSpan="2">№ инструкторского участка</th>
                    <th rowSpan="2">№ счетного участка</th>
                    <th rowSpan="2">№ списка проживающих</th>
                    <th rowSpan="2">№ п.п. домохозяйства в пределах помещения (из графы 2 Формы 1)</th>
                    <th rowSpan="2">№ п.п. лица в пределах домохозяйства (из графы 3 Формы 1)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" name="dept_no" id="dept_no" findex={this.props.findex} /></td>
                    <td><Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" name="instructor_sector_no" id="instructor_sector_no" findex={this.props.findex} /></td>
                    <td><Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" name="counting_sector_no" id="counting_sector_no" findex={this.props.findex} /></td>
                    <td><Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" name="resident_list_no" id="resident_list_no" findex={this.props.findex} /></td>
                    <td><Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" name="household_no" id="household_no" findex={this.props.findex} /></td>
                    <td><Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" name="person_no" id="person_no" findex={this.props.findex} /></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Table size="sm" bordered>
            <tbody>
              <tr style={{ background: "#e4e5e6" }}><th>ПЕРЕПИСНОЙ ЛИСТ – ДЛИТЕЛЬНО ОТСУТСТВУЮЩИЕ (1 ГОД И БОЛЕЕ) НА ТЕРРИТОРИИ КЫРГЫЗСКОЙ РЕСПУБЛИКИ</th></tr>
            </tbody>
          </Table>
          {/* <Label style={{ fontWeight: 'bold' }}></Label> */}
          <Row>
            <Col md={6}>
              <Table size="sm" bordered>
                <tbody>
                  <InputRow onChange={(e) => this.handleChange(e)} label="1. РОДСТВЕННЫЕ ИЛИ ДРУГИЕ ОТНОШЕНИЯ С ЛИЦОМ, УКАЗАННЫМ ПЕРВЫМ В ДОМОХОЗЯЙСТВЕ:" mask="99" mchar="" name="relationship_type" value={this.state.form4data.relationship_type} findex={this.props.findex} disabledd={false} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="№ матери (или отца)" mask="99" mchar="" name="parent_no" value={this.state.form4data.parent_no} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="2. ПОЛ" mask="9" mchar="" name="gender" value={this.state.form4data.gender} findex={this.props.findex} />
                </tbody>
              </Table>
              <Table size="sm" bordered>
                <tbody>
                  <tr>
                    <th style={{ width: "30%" }}>3. ДАТА РОЖДЕНИЯ</th>
                    <td style={{ width: "20%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99-99-9999" maskChar="" tag={InputMask} name="birthdate" value={this.state.form4data.birthdate || ''} findex={this.props.findex} />
                    </td>
                    <th style={{ width: "30%" }}>Возраст</th>
                    <td style={{ width: "20%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" name="age" value={this.state.form4data.age} findex={this.props.findex} mask="999" maskChar="" tag={InputMask} disdabled/>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table size="sm" bordered>
                <tbody>
                  <InputRow onChange={(e) => this.handleChange(e)} label="4. СЕМЕЙНОЕ ПОЛОЖЕНИЕ" mask="9" mchar="" name="marital_status" value={this.state.form4data.marital_status} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="№ жены (мужа)" mask="99" mchar="" name="spouse_no" value={this.state.form4data.spouse_no} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="5. НАЦИОНАЛЬНОСТЬ" mask="999" mchar="" name="nationality" value={this.state.form4data.nationality} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="6. СТРАНА РОЖДЕНИЯ" mask="999" mchar="" name="country_born" value={this.state.form4data.country_born} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="7. СТРАНА ГРАЖДАНСТВА" mask="999" mchar="" name="citizenship" value={this.state.form4data.citizenship} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="8. ГОД ВЫЕЗДА ИЗ КЫРГЫЗСКОЙ РЕСПУБЛИКИ" mask="9999" mchar="" name="leaving_year" value={this.state.form4data.leaving_year} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="9. СТРАНА ПРОЖИВАНИЯ ЗА РУБЕЖОМ" mask="999" mchar="" name="residence_country" value={this.state.form4data.residence_country} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="10. ОСНОВНАЯ ПРИЧИНА ВЫБЫТИЯ ИЗ КЫРГЫЗСКОЙ РЕСПУБЛИКИ" mask="9" mchar="" name="leaving_reason" value={this.state.form4data.leaving_reason} findex={this.props.findex} />
                  
                </tbody>
              </Table>
            </Col>
            
          </Row>
          
        </Col>
      </Row>
    )
  }
}

export default Form4;
