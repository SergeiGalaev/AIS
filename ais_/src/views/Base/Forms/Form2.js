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
        <td id={`sval_${this.props.name}_${this.props.findex}`} style={{ width: "30%" }}>
        </td>
      </tr>
    )
  }
}

class Form2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form2data: {
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
        exists_birth_certificate: null,
        marital_status: null,
        spouse_no: null,
        nationality: null,
        country_born_id: null,
        citizenship: null,
        mother_tounge: null,
        kyrgyz_language_knowledge: null,
        russian_language_knowledge: null,
        other_language_knowledge: null,
        resident_from_birth: null,
        arrival_year: null,
        previous_residence_district: null,
        previous_residence_country: null,
        arrival_reason_location: null,
        longterm_resident_abroad: null,
        longterm_resident_abroad_country: null,
        arrival_previous_country: null,
        return_year: null,
        education_level: null,
        read_write: null,
        academic_degree: null,
        education_now: null,
        kindergarten: null,
        vision_problems: null,
        hearing_problems: null,
        walking_problems: null,
        attention_problems: null,
        care_problems: null,
        means_sources: null,
        basic_means: null,
        work_or_business_now: null,
        work_status: null,
        workers_count: null,
        work_place: null,
        work_place_country: null,
        economic_activity: null,
        profession: null,
        work_search: null,
        consent_work: null,
        mobile: null,
        internet: null,
        computer: null,
        birt_children_count: null,
        birt_boys_count: null,
        birt_girls_count: null,
        alive_children_count: null,
        alive_boys_count: null,
        alive_girls_count: null,
        blamk_number: null
      },
    };
    this.handleChange = this.handleChange.bind(this);

  }

  // componentDidMount() {
  //   this.props.data.push(this.state.form2data)
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
    let fdata = this.state.form2data
    fdata[name] = keyval
    if (variants.f2variants[name]) {
      let find = false
      const lastval = variants.f2variants[name][variants.f2variants[name].length - 1][0]
      flength = lastval.length
      const maxval = typeof lastval === 'number' ? lastval : 99999
      if (parseInt(keyval) > maxval || keyval === '0') {
        let newval = keyval.substring(0, keyval.length - 1)
        fdata[name] = newval
        keyval = this.state.form2data[name]
      }

      for (let ind = 0; ind < variants.f2variants[name].length; ind++) {
        let curr_value = variants.f2variants[name][ind][0]
        curr_value = name === 'economic_activity' ? curr_value : parseFloat(curr_value)
        const keyvals = name === 'economic_activity' ? keyval : parseFloat(keyval)
        if (curr_value === keyvals) {
          find = true
          document.getElementById(`sval_${name}_${this.props.findex}`).innerHTML = variants.f2variants[name][ind][1]
          break;
        } else {
          document.getElementById(`sval_${name}_${this.props.findex}`).innerHTML = ''
        }
      }
      if (!find && flength === keyval.length) {
        fdata[name] = ''
        document.getElementById(`sval_${name}_${this.props.findex}`).innerHTML = ''
        keyval = ''
      }
    }

    if (name === 'birthdate') {
      if (keyval.length === 10 ) {
        const bdate = moment(keyval, 'DD-MM-YYYY').toDate();
        const mindate = moment('01-01-1890', 'DD-MM-YYYY').toDate();
        const maxdate = moment('01-04-2019', 'DD-MM-YYYY').toDate();
        if (bdate >= mindate && bdate >= maxdate) {
          const years = moment('25-03-2019', 'DD-MM-YYYY').diff(bdate, 'years', false);
          if (years >= 0) {
            fdata['age'] = years.toString()
            if (years > 17) {
              form.elements[index + 3].focus();
              form.elements[index + 3].select();
            } else {
              form.elements[index + 2].focus();
              form.elements[index + 2].select();
            }
          }
        } else {
          fdata['age'] = 'Ошибка!'
        }
      } else {
        fdata['age'] = 'Ошибка!'
      }
      this.props.data.age = fdata['age']


    }
    this.setState({ form2data: fdata })
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
              <tr style={{ background: "#e4e5e6" }}><th>ПЕРЕПИСНОЙ ЛИСТ– НАСЕЛЕНИЕ стр. 1</th></tr>
            </tbody>
          </Table>
          {/* <Label style={{ fontWeight: 'bold' }}></Label> */}
          <Row>
            <Col md={6}>
              <Table size="sm" bordered>
                <tbody>
                  <InputRow onChange={(e) => this.handleChange(e)} label="1. РОДСТВЕННЫЕ ИЛИ ДРУГИЕ ОТНОШЕНИЯ С ЛИЦОМ, УКАЗАННЫМ ПЕРВЫМ В ДОМОХОЗЯЙСТВЕ:" mask="99" mchar="" name="relationship_type" value={this.state.form2data.relationship_type} findex={this.props.findex} disabledd={false} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="№ матери (или отца)" mask="99" mchar="" name="parent_no" value={this.state.form2data.parent_no} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="2. ВАШ ПОЛ" mask="9" mchar="" name="gender" value={this.state.form2data.gender} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="3. ОТМЕТКА О ВРЕМЕННОМ ОТСУТСТВИИ ИЛИ ВРЕМЕННОМ ПРОЖИВАНИИ" mask="9" mchar="" name="residence_type" value={this.state.form2data.residence_type} findex={this.props.findex} />
                </tbody>
              </Table>
              <Table size="sm" bordered>
                <tbody>
                  <tr>
                    <th style={{ width: "30%" }}>4. ДАТА ВАШЕГО РОЖДЕНИЯ</th>
                    <td style={{ width: "20%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99-99-9999" maskChar="" tag={InputMask} name="birthdate" value={this.state.form2data.birthdate || ''} findex={this.props.findex} />
                    </td>
                    <th style={{ width: "30%" }}>Возраст</th>
                    <td style={{ width: "20%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" name="age" disabled value={this.state.form2data.age} findex={this.props.findex}  mask="999" maskChar="" tag={InputMask}/>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table size="sm" bordered>
                <tbody>
                  <InputRow onChange={(e) => this.handleChange(e)} label="5. ИМЕЕТСЯ ЛИ У ВАС СВИДЕТЕЛЬСТВО О РОЖДЕНИИ (МЕТРИКА)?" mask="9" mchar="" name="exists_birth_certificate" value={this.state.form2data.exists_birth_certificate || ''} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="6. ВАШЕ СЕМЕЙНОЕ ПОЛОЖЕНИЕ" mask="9" mchar="" name="marital_status" value={this.state.form2data.marital_status} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="№ жены (мужа)" mask="99" mchar="" name="spouse_no" value={this.state.form2data.spouse_no} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="7. ВАША НАЦИОНАЛЬНОСТЬ" mask="999" mchar="" name="nationality" value={this.state.form2data.nationality} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="8. СТРАНА ВАШЕГО РОЖДЕНИЯ" mask="999" mchar="" name="country_born_id" value={this.state.form2data.country_born_id} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="9. СТРАНА ВАШЕГО ГРАЖДАНСТВА" mask="999" mchar="" name="citizenship" value={this.state.form2data.citizenship} findex={this.props.findex} />
                  <tr style={{ background: "#6ef1a2" }}><th colSpan="3">10. ВЛАДЕНИЕ ЯЗЫКАМИ</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.1 ВАШ РОДНОЙ ЯЗЫК" mask="999" mchar="" name="mother_tounge" value={this.state.form2data.mother_tounge} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.2 ВЛАДЕЕТЕ ЛИ ВЫ КЫРГЫЗСКИМ ЯЗЫКОМ?" mask="9" mchar="" name="kyrgyz_language_knowledge" value={this.state.form2data.kyrgyz_language_knowledge} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.3 ВЛАДЕЕТЕ ЛИ ВЫ РУССКИМ ЯЗЫКОМ?" mask="9" mchar="" name="russian_language_knowledge" value={this.state.form2data.russian_language_knowledge} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="10.4 КАКИМИ ИНЫМИ ЯЗЫКАМИ ВЫ СВОБОДНО ВЛАДЕЕТЕ?" mask="999" mchar="" name="other_language_knowledge" value={this.state.form2data.other_language_knowledge} findex={this.props.findex} />
                </tbody>
              </Table>
            </Col>
            <Col md={6}>
              <Table size="sm" bordered>
                <tbody>
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='3'>11. МИГРАЦИЯ</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="11.1 В ЭТОМ ГОРОДЕ, ПГТ. ИЛИ СЕЛЬСКОЙ МЕСТНОСТИ ЭТОГО РАЙОНА ВЫ ПРОЖИВАЕТЕ НЕПРЕРЫВНО С РОЖДЕНИЯ?" mask="9" mchar="" name="resident_from_birth" value={this.state.form2data.resident_from_birth} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="Год или месяц переезда" mask="9999" mchar="" name="arrival_year" value={this.state.form2data.arrival_year} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="11.2 ВАШЕ ПРЕЖНЕЕ МЕСТО ЖИТЕЛЬСТВА" mask="99999" mchar="" name="previous_residence_district" value={this.state.form2data.previous_residence_district} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="Кыргызская Республика" mask="99999" mchar="" name="previous_residence_district" value={this.state.form2data.previous_residence_district} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="другая страна" mask="999" mchar="" name="previous_residence_country" value={this.state.form2data.previous_residence_country} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="11.3 УКАЖИТЕ ОСНОВНУЮ ПРИЧИНУ, ПО КОТОРОЙ ВЫ ПРИБЫЛИ В ДАННЫЙНАСЕЛЕННЫЙ ПУНКТ" mask="99" mchar="" name="arrival_reason_location" value={this.state.form2data.arrival_reason_location} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="11.4 ПРОЖИВАЛИ ЛИ ВЫ НЕПРЕРЫВНО 1 ГОД И БОЛЕЕ В ДРУГОЙ СТРАНЕ?" mask="9" mchar="" name="longterm_resident_abroad" value={this.state.form2data.longterm_resident_abroad} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="11.5 ИЗ КАКОЙ СТРАНЫ ВЫ ПРИБЫЛИ В КЫРГЫЗСКУЮ РЕСПУБЛИКУ НА ПОСТОЯННОЕ МЕСТО ЖИТЕЛЬСТВА?" mask="999" mchar="" name="longterm_resident_abroad_country" value={this.state.form2data.longterm_resident_abroad_country} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="11.6 ГОД ПРИБЫТИЯ (ВОЗВРАЩЕНИЯ) В КЫРГЫЗСКУЮ РЕСПУБЛИКУ" mask="9999" mchar="" name="return_year" value={this.state.form2data.return_year} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="11.7 УКАЖИТЕ ОСНОВНУЮ ПРИЧИНУ, ПО КОТОРОЙ ВЫ ПРИБЫЛИ В КЫРГЫЗСКУЮ РЕСПУБЛИКУ НА ПОСТОЯННОЕ МЕСТО ЖИТЕЛЬСТВА" mask="99" mchar="" name="arrival_previous_country" value={this.state.form2data.arrival_previous_country} findex={this.props.findex} />
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='3'>12. ОБРАЗОВАНИЕ И ОБУЧЕНИЕ</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="12.1 ВАШ УРОВЕНЬ ОБРАЗОВАНИЯ" mask="99" mchar="" name="education_level" value={this.state.form2data.education_level} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="12.2 УМЕЕТЕ ЛИ ВЫ ЧИТАТЬ И ПИСАТЬ?" mask="9" mchar="" name="read_write" value={this.state.form2data.read_write} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="12.3 ИМЕЕТЕ ЛИ ВЫ УЧЕНУЮ СТЕПЕНЬ?" mask="9" mchar="" name="academic_degree" value={this.state.form2data.academic_degree} findex={this.props.findex} />
                </tbody>
              </Table>
            </Col>
          </Row>
          <Table size="sm" bordered>
            <tbody>
              <tr style={{ background: "#e4e5e6" }}><th>ПЕРЕПИСНОЙ ЛИСТ– НАСЕЛЕНИЕ стр. 2</th></tr>
            </tbody>
          </Table>
          <Row>
            <Col md={6}>
              <Table size="sm" bordered>
                <tbody>
                  <InputRow onChange={(e) => this.handleChange(e)} label="13. ПОЛУЧАЕТЕ ЛИ ВЫ ОБРАЗОВАНИЕ В НАСТОЯЩЕЕ ВРЕМЯ?" mask="9" mchar="" name="education_now" value={this.state.form2data.education_now} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="тип образовательной организации" mask="9" mchar="" name="type_school" value={this.state.form2data.type_school} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="14. ПОСЕЩАЕТ ЛИ РЕБЕНОК ДОШКОЛЬНУЮ ОРГАНИЗАЦИЮ?" mask="9" mchar="" name="kindergarten" value={this.state.form2data.kindergarten} findex={this.props.findex} />
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='3'>15. ФУНКЦИОНАЛЬНЫЕ ОГРАНИЧЕНИЯ ВОЗМОЖНОСТЕЙ</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="15.1 У ВАС ЕСТЬ ТРУДНОСТИ СО ЗРЕНИЕМ ДАЖЕ ПРИ ПОМОЩИ ОЧКОВ?" mask="9" mchar="" name="vision_problems" value={this.state.form2data.vision_problems} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="15.2 У ВАС ЕСТЬ ТРУДНОСТИ СО СЛУХОМ, ДАЖЕ ЕСЛИ ВЫ ПОЛЬЗУЕТЕСЬ СЛУХОВЫМ АППАРАТОМ?" mask="9" mchar="" name="hearing_problems" value={this.state.form2data.hearing_problems} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="15.3 У ВАС ЕСТЬ ТРУДНОСТИ С ХОДЬБОЙ ИЛИ ПОДНЯТИЕМ ПО ЛЕСТНИЦЕ?" mask="9" mchar="" name="walking_problems" value={this.state.form2data.walking_problems} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="15.4 У ВАС ЕСТЬ ТРУДНОСТИ С ЗАПОМИНАНИЕМ ИЛИ КОНЦЕНТРАЦИЕЙ ВНИМАНИЯ?" mask="9" mchar="" name="attention_problems" value={this.state.form2data.attention_problems} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="15.5 У ВАС ЕСТЬ ТРУДНОСТИ ПО УХОДУ ЗА СОБОЙ (С САМООБСЛУЖИВАНИЕМ, НАПРИМЕР, СВЯЗАННЫЕ С УМЫВАНИЕМ ИЛИ ПЕРЕОДЕВАНИЕМ СЕБЯ)?" mask="9" mchar="" name="care_problems" value={this.state.form2data.care_problems} findex={this.props.findex} />
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='3'>16. ИСТОЧНИКИ СРЕДСТВ К СУЩЕСТВОВАНИЮ</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="16.1 УКАЖИТЕ ВСЕ ИМЕЮЩИЕСЯ У ВАС ИСТОЧНИКИ СРЕДСТВ К СУЩЕСТВОВАНИЮ В ТЕКУЩЕМ ГОДУ" mask="99" mchar="" name="means_sources" value={this.state.form2data.means_sources} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="16.2 ИЗ ПЕРЕЧИСЛЕННЫХ ИСТОЧНИКОВ УКАЖИТЕ, КАКОЙ СЧИТАЕТЕ ДЛЯ СЕБЯ ОСНОВНЫМ (из в" mask="99" mchar="" name="basic_means" value={this.state.form2data.basic_means} findex={this.props.findex} />
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='3'>17. ЗАНЯТОСТЬ И БЕЗРАБОТИЦА</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="17.1 ИМЕЛИ ЛИ ВЫ КАКУЮ-ЛИБО ОПЛАЧИВАЕМУЮ РАБОТУ ИЛИ ДОХОДНОЕ ЗАНЯТИЕ С 18 ПО 24 МАРТА 2019 ГОДА?" mask="9" mchar="" name="work_or_business_now" value={this.state.form2data.work_or_business_now} findex={this.props.findex} />
                </tbody>
              </Table>
            </Col>
            <Col md={6}>
              <Table size="sm" bordered>
                <tbody>
                  <InputRow onChange={(e) => this.handleChange(e)} label="17.2 КЕМ ВЫ ЯВЛЯЛИСЬ НА ОСНОВНОЙ РАБОТЕ?" mask="9" mchar="" name="work_status" value={this.state.form2data.work_status} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="Работодатель (работающий с привлечением наемных работников)" mask="9.9" mchar="" name="work_status_1" value={this.state.form2data.work_status_1} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="Число работников" mask="999" mchar="" name="workers_count" value={this.state.form2data.workers_count} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="17.3 МЕСТО НАХОЖДЕНИЯ РАБОТЫ" mask="9" mchar="" name="work_place" value={this.state.form2data.work_place} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="Место нахождения работы в другом месте" mask="9.9" mchar="" name="work_other_place" value={this.state.form2data.work_other_place} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="Место нахождения работы в другой стране" mask="999" mchar="" name="work_place_country" value={this.state.form2data.work_place_country} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="17.4 ВИД ЭКОНОМИЧЕСКОЙ ДЕЯТЕЛЬНОСТИ ПРЕДПРИЯТИЯ, ОРГАНИЗАЦИИ, ГДЕ ВЫ РАБОТАЕТЕ" mask="99.99" mchar="" name="economic_activity" value={this.state.form2data.economic_activity} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="17.5. ДОЛЖНОСТЬ ИЛИ ПРОФЕССИЯ" mask="9999" mchar="" name="profession" value={this.state.form2data.profession} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="17.6 ИСКАЛИ ЛИ ВЫ РАБОТУ В ТЕЧЕНИЕ ПОСЛЕДНЕГО МЕСЯЦА" mask="9" mchar="" name="work_search" value={this.state.form2data.work_search} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="Возможность приступить к работе" mask="9" mchar="" name="opportunity_work" value={this.state.form2data.opportunity_work} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="Причина отказа от предложенной работы" mask="99" mchar="" name="consent_work" value={this.state.form2data.consent_work} findex={this.props.findex} />
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='3'>18. ИСПОЛЬЗОВАНИЕ СОВРЕМЕННЫХ СРЕДСТВ СВЯЗИ</th></tr>
                  <InputRow onChange={(e) => this.handleChange(e)} label="а) пользуютесь ли мобильной связью?" mask="9" mchar="" name="mobile" value={this.state.form2data.mobile} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="б) пользуютесь ли сетью интернет?" mask="9" mchar="" name="internet" value={this.state.form2data.internet} findex={this.props.findex} />
                  <InputRow onChange={(e) => this.handleChange(e)} label="в) пользуютесь ли компьютером /ноутбуком /планшетом?" mask="9" mchar="" name="computer" value={this.state.form2data.computer} findex={this.props.findex} />
                </tbody>
              </Table>
              <Table size="sm" bordered>
                <tbody>
                  <tr style={{ background: "#6ef1a2" }}><th colSpan='7'>19. РОЖДАЕМОСТЬ (для женщин в возрасте 15 лет и старше)</th></tr>
                  <tr><th style={{ width: "20%" }}>а) СКОЛЬКО ДЕТЕЙ ВЫ РОДИЛИ?</th>
                    <th style={{ width: "10%" }}>число детей</th>
                    <td style={{ width: "10%" }} name="birt_children_count" value={this.state.form2data.birt_children_count || ''} findex={this.props.findex}>
                      {/* <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="birt_children_count"  value={this.state.form2data.birt_children_count || ''}findex={this.props.findex} /> */}
                    </td>
                    <th style={{ width: "20%" }}>мальчики</th>
                    <td style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="birt_boys_count" value={this.state.form2data.birt_boys_count || ''} findex={this.props.findex} />
                    </td>
                    <th style={{ width: "20%" }}>девочки</th>
                    <td style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="birt_girls_count" value={this.state.form2data.birt_girls_count || ''} findex={this.props.findex} />
                    </td>
                  </tr>
                  <tr>
                    <th style={{ width: "20%" }}>б) СКОЛЬКО ДЕТЕЙ ЖИВЫ?</th>
                    <th style={{ width: "10%" }}>число детей</th>
                    <td style={{ width: "10%" }} name="alive_children_count" value={this.state.form2data.alive_children_count || ''} findex={this.props.findex} >
                      {/* <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="alive_children_count"  value={this.state.form2data.alive_children_count || ''}findex={this.props.findex} /> */}
                    </td>
                    <th style={{ width: "20%" }}>мальчики</th>
                    <td style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="alive_boys_count" value={this.state.form2data.alive_boys_count || ''} findex={this.props.findex} />
                    </td>
                    <th style={{ width: "20%" }}>девочки</th>
                    <td style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="99" maskChar="" tag={InputMask} name="alive_girls_count" value={this.state.form2data.alive_girls_count || ''} findex={this.props.findex} />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table size="sm" bordered>
                <tbody>
                  <tr>
                    <th style={{ width: "80%" }}>No БЛАНКА В ПРЕДЕЛАХ ПОРТФЕЛЯ</th>
                    <td style={{ width: "10%" }}>
                      <Input onChange={(e) => this.handleChange(e)} bsSize="sm" type="text" mask="999" maskChar="" tag={InputMask} name="blamk_number" findex={this.props.findex} />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Form2;
