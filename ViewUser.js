import React from 'react'

import Pane from '@folio/stripes-components/lib/Pane'
import Button from '@folio/stripes-components/lib/Button'
import KeyValue from '@folio/stripes-components/lib/KeyValue'
import {Row, Col} from 'react-bootstrap'
import TextField from '@folio/stripes-components/lib/TextField'
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList'
import Icon from '@folio/stripes-components/lib/Icon'



export default class ViewUser extends React.Component{
  render () {
    const { fineHistory, user } =  this.props;
    if (!user) return <div/>;
    return (
      <Pane defaultWidth="fill">
        <Row>
          <Col xs={8} >
            <Row>
              <Col xs={12}>
                <h2>{user.personal.full_name}</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <KeyValue label="Address" value={user.address}/>
              </Col>
              <Col xs={4}>
                <KeyValue label="Phone" value={user.phone}/>
              </Col>
              <Col xs={4}>
                <KeyValue label="Fines" value={user.fines}/>
              </Col>
            </Row>
          </Col>
          <Col xs={4} >
            <img className="floatEnd" src="http://placehold.it/175x175"/>
          </Col>
        </Row>
        <br/>
        <hr/>
        <br/>
        <Row>
        <Col xs={3}>
          <h3 className="marginTopHalf">Fines</h3>
        </Col>
        <Col xs={4} sm={3}>
            <TextField 
              rounded 
              endControl={<Button buttonStyle="fieldControl"><Icon icon='clearX'/></Button>}
              startControl={<Icon icon='search'/>}
              placeholder="Search"
              />
              
        </Col>
        <Col xs={5} sm={6}>
          <Button align="end" bottomMargin0 >View Full History</Button>
        </Col>
        </Row>
        <MultiColumnList fullWidth contentData={fineHistory} />
      </Pane>
    );
  }
}