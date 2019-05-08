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
          <Input onChange={this.props.onChange} bsSize="sm" type="text" mask={this.props.mask} maskChar={this.props.mchar} tag={InputMask} name={this.props.name} value={this.props.value || ''} findex={this.props.findex} />
        </td>
        <td id={`svalf5_${this.props.name}_${this.props.findex}`} style={{ width: "30%" }}>
        </td>
      </tr>
    )
  }
}

class Form5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form5data: {
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
        birthdate: null,
        age: null,
        country_born: null,
        citizenship: null,
        residence_country: null,
        arrival_reason: null,
      },
    };
    this.handleChange = this.handleChange.bind(this);

  }

  // componentDidMount() {
  //   this.props.data.push(this.state.form5data)
  // }

  handleChange(event) {
    console.log(this.state)
    console.log(event)
    const name = event.target.name;
    let keyval = event.target.value;
    if (keyval.substr(keyval.length - 1, 1) === '.') keyval = keyval.substring(0, keyval.length - 1)
    let fdata = this.state.form5data
    fdata[name] = keyval
    if (variants.f5variants[name]) {
      console.log(variants.f5variants[name][variants.f5variants[name].length - 1])
      const maxval = variants.f5variants[name][variants.f5variants[name].length - 1][0]
      if (parseInt(keyval) > maxval) {
        let newval = keyval.substring(0, keyval.length - 1)
        fdata[name] = newval

        keyval = this.state.form5data[name]
      }
      for (let ind = 0; ind < variants.f5variants[name].length; ind++) {
        if (variants.f5variants[name][ind][0].toString() === keyval) {
          document.getElementById(`svalf5_${name}_${this.props.findex}`).innerHTML = variants.f5variants[name][ind][1]
          break;
        } else {
          document.getElementById(`svalf5_${name}_${this.props.findex}`).innerHTML = ''
        }
      }
    }
    if (name === 'birthdate') {
      if (keyval.length === 10) {
        const bdate = moment(keyval, 'DD-MM-YYYY').toDate();
        if (bdate) {
          const years = moment('25-03-2019', 'DD-MM-YYYY').diff(bdate, 'years', false);
          fdata['age'] = years
        }
      } else {
        fdata['age'] = ''
      }
    }
    this.setState({ form5data: fdata })
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
          {/* <Form id="f2"> */}
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
              <tr style={{ background: "#e4e5e6" }}><th>Переписной лист - временно пребывающие (проживающие) на территории Кыргызской Республики, находящиеся в учреждении коллективного проживания</th></tr>
            </tbody>
          </Table>
          {/* <Label style={{ fontWeight: 'bold' }}></Label> */}
          <Row>
            <Col md={6}>
              <Table size="sm" bordered>
                <tbody>
                  <InputRow onChange={(e) => this.handleChange(e)} label="1. Родственные или другие отношения с лицом, указанным первым в домохозяйстве" mask="99" mchar="" name="relationship_type" value={this.state.form5data.relationship_type} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="№ матери (или отца)" mask="99" mchar="" name="parent_no" value={this.state.form5data.parent_no} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="2. Пол" mask="9" mchar="" name="gender" value={this.state.form5data.gender} findex={this.props.findex} />
                </tbody>
              </Table>
              <Table size="sm" bordered>
                <tbody>
                  <tr>
                    <th style={{ width: "30%" }}>3. Дата рождения</th>
                    <td style={{ width: "20%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99-99-9999" maskChar="" tag={InputMask} name="birthdate" value={this.state.form5data.birthdate || ''} findex={this.props.findex} />
                    </td>
                    <th style={{ width: "30%" }}>Возраст</th>
                    <td style={{ width: "20%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar={null} tag={InputMask} name="age" value={this.state.form5data.age || ''} findex={this.props.findex} />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table size="sm" bordered>
                <tbody>
                  <InputRow onChange={(e) => this.handleChange(e)} label="4. Страна рождения" mask="999" mchar="" name="country_born_id" value={this.state.form5data.country_born_id} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="5. Страна гражданства" mask="999" mchar="" name="citizenship" value={this.state.form5data.citizenship} findex={this.props.findex} />
                  <tr style={{ background: "#6ef1a2" }}><th colSpan="3">6. Место постоянного проживания</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="1 - Кыргызская Республика" mask="99999" mchar="" name="country_born" value={this.state.form5data.country_born} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="2 - другая страна" mask="999" mchar="" name="citizenship1" value={this.state.form5data.citizenship1} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="7. Продолжительность пребывания в учреждении" mask="9" mchar="" name="leaving_year" value={this.state.form5data.leaving_year} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="8. Основная причина прибытия в Кыргызскую Республику" mask="9" mchar="" name="arriv_reason" value={this.state.form5data.leaving_reason} findex={this.props.findex} />
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Form5;
