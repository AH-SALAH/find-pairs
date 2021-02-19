import { Row, Col, Card, Typography, Divider, Form, Select, Button, Statistic } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restart as restartAction } from "@/redux/actions/restart";
import { changeSize } from "@/redux/actions/size";
import { selectRestartValue } from "@/redux/selectors/restart";
import { selectScoreValue } from "@/redux/selectors/score";
import { selectSizeValue } from "@/redux/selectors/size";
import { selectTriesValue } from "@/redux/selectors/tries";
import { m as motion } from "framer-motion";
import { slideInFromBottom, slideInFromRight } from "@/animation/slide";
import { stagger } from "@/animation/stagger";

const InfoPanel = () => {

    const dispatch = useDispatch();
    const scoreValue = useSelector(useMemo(selectScoreValue, []));
    const triesValue = useSelector(useMemo(selectTriesValue, []));
    const sizeValue = useSelector(useMemo(selectSizeValue, []));
    const restart = useSelector(useMemo(selectRestartValue, []));

    const [form] = Form.useForm();
    const { setFieldsValue } = form;

    const [sizeOptions] = useState([8, 10, 12, 15, 18, 21]);

    const handleRestart = () => {
        dispatch(restartAction(true));
    };

    const handleSizeChange = val => {
        dispatch(changeSize(val));
    };

    useEffect(() => {
        setFieldsValue({ size: sizeValue });
    }, [sizeValue]);

    return (
        <motion.div initial="init" animate="animate" variants={slideInFromRight}>
            <Card headStyle={{ border: '0 none', fontSize: '1.3em', fontFamily: 'Lato', fontWeight: 'bold' }}>
                <Card.Grid style={{ boxShadow: 'none', width: '100%', padding: '15px 24px' }}>
                    <motion.div initial="init" animate="animate" custom={{ delayChildren: 1 }} variants={stagger}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ width: '100%' }}>
                            <Col span={24} md={24} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <motion.div variants={slideInFromBottom}>
                                    <Typography.Title level={4} style={{ marginBottom: 20, lineHeight: 1 }}>{'Score'}</Typography.Title>
                                </motion.div>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={{ width: '100%' }}>
                            <Col span={24} md={24} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <motion.div variants={slideInFromBottom}>
                                    <Statistic
                                        value={scoreValue}
                                        suffix={<Typography.Title level={2} style={{ margin: '0 0.3em', fontSize: '2.5em' }}>{'/'} {sizeValue}</Typography.Title>}
                                        valueStyle={{ color: '#1890ff', fontSize: '2.5em', fontWeight: 'bold' }}
                                    />
                                </motion.div>
                            </Col>
                            <Col span={24} md={24} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <motion.div variants={slideInFromBottom}>
                                    <Typography.Title level={5} type="secondary" style={{ fontSize: '1.2em', margin: '25px 0 0' }}>{'Tries:'} {triesValue}</Typography.Title>
                                </motion.div>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                            <Col span={24} md={12} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <motion.div variants={slideInFromBottom} style={{ width: '100%' }}>
                                    <Divider style={{ borderTop: '0.1em solid rgba(0,0,0,0.2)', margin: '30px 0' }} />
                                </motion.div>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                            <Col span={24} md={24} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <motion.div variants={slideInFromBottom}>
                                    <Typography.Title level={4} style={{ marginBottom: 35 }}>{'Options'}</Typography.Title>
                                </motion.div>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                            <Col span={24} md={24} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Form
                                    form={form}
                                    name="selectSize"
                                    // onFinish={onFinish}
                                    initialValues={{
                                        size: sizeValue,
                                    }}
                                    style={{ width: '100%' }}
                                    layout="inline"
                                >
                                    <motion.div variants={slideInFromBottom}>
                                        <Form.Item
                                            name="size"
                                            label="Size"
                                            colon={false}
                                            labelCol={{ style: { marginRight: 10, fontSize: '1.1em' } }}
                                            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 35 }}
                                        >
                                            <Select placeholder="select size" onChange={handleSizeChange} disabled={restart}>
                                                {
                                                    sizeOptions.map((sz, i) =>
                                                        <Select.Option key={sz + '_' + i} value={sz}>{sz} pairs</Select.Option>
                                                    )
                                                }
                                            </Select>
                                        </Form.Item>
                                    </motion.div>
                                </Form>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                            <Col span={24} md={24} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <motion.div variants={slideInFromBottom}>
                                    <Button type="primary" onClick={handleRestart} disabled={restart}>
                                        {'Restart'}
                                    </Button>
                                </motion.div>
                            </Col>
                        </Row>
                    </motion.div>
                </Card.Grid>
            </Card>
        </motion.div>
    )
}

export default InfoPanel;
