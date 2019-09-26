import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import './Profile.css'
import {connect} from 'react-redux';
import {getSettings} from './redux/selectors';
import store from './redux/store'
import {SaveSettings} from "./redux/actions/settings_actions";

const mapStateToProps = state => {
    const settings = getSettings(state);
    return {settings};
};

const formatTime = timeInSeconds => {
    let timeStr = String(Math.round(timeInSeconds/3600)).padStart(2, '0') + ':' + String(timeInSeconds%60).padStart(2, '0');
    return timeStr;
};

const timeInSeconds = timeStr => {
    let splits = timeStr.split(':');
    let seconds = (parseInt(splits[0], 10) * 3600) + parseInt(splits[1], 10);
    return seconds;
};

const Profile = ({settings}) => {
    return (
        <div className="Profile">
            <h1>Your profile</h1>
            <Form>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="profileEmail">Email</Label>
                            <Input type="email" name="email" id="profileEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="profilePassword">Password</Label>
                            <Input type="password" name="password" id="profilePassword" placeholder="password placeholder" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="profileCity">City</Label>
                            <Input type="text" name="city" id="profileCity"/>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="profileState">State</Label>
                            <Input type="text" name="state" id="profileState"/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="profileZip">Zip</Label>
                            <Input type="text" name="zip" id="profileZip"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="profileBrand">Brand</Label>
                            <Input type="text" name="brand" id="profileBrand" defaultValue={settings.tabacBrand.name}/>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="profilePrice">Price</Label>
                            <Input type="number" step="0.1" name="price" id="profilePrice" defaultValue={settings.tabacBrand.price}/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="profileContents">Number in pack</Label>
                            <Input type="number" name="contents" id="profileContents" defaultValue={settings.tabacBrand.contents}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <FormGroup>
                        <Label for="profileTime">Time between smokes</Label>
                        <Input
                            type="time"
                            name="settings.timeBetweenSmokes"
                            id="profileTime"
                            placeholder="time placeholder"
                            value = {formatTime(settings.timeBetweenSmokes)}
                            onChange = { (e) => {
                                settings.timeBetweenSmokes = timeInSeconds(e.target.value);
                                store.dispatch(SaveSettings(settings));
                            }}
                        />
                    </FormGroup>
                </Row>
                <Button color="success" onClick={ () => store.dispatch(SaveSettings(settings))}>Save</Button>
            </Form>
        </div>
    );
};

export default connect(mapStateToProps)(Profile);