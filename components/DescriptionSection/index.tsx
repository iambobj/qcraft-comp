import React, { FC } from 'react';
import { Card, Grid, Typography } from '@arco-design/web-react';
import './style/index'

const { Paragraph } = Typography;
const { Col, Row } = Grid;

function getCardConfig(title: string) {
  return {
    title: title ? <span className="detailSubTitle">{title}</span> : '',
    bordered: false,
    bodyStyle: { backgroundColor: '#f6f7fb', paddingTop: 17, paddingLeft: 16 },
    headerStyle: title ? { color: '#1A2233', padding: '0px 0 12px', border: 0 } : { height: 0 },
  };
}

const DescriptionSection: FC<{
  title: string;
  fields: Array<{ title: string; dataIndex: string; render?: Function }>;
  data: any;
  type?: string;
}> = ({ title, fields, data, type }) => {
  const renderFlex = () => {
    const rowCount = Math.ceil(fields.length / 2);
    return new Array(rowCount).fill(0).map((_row, rowIndex) => {
      const isLastRow = rowIndex === rowCount - 1;
      const first = fields[rowIndex * 2];
      const second = fields[rowIndex * 2 + 1];
      return (
        <Row className="detailInfoFont" style={{ marginBottom: isLastRow ? 0 : '10px' }} key={rowIndex}>
          {first ? (
            <>
              <Col span={3} style={{ color: '#4E5969' }}>
                {fields[rowIndex * 2].title}
              </Col>
              <Col span={9}>
                <Paragraph ellipsis={{ rows: 1, expandable: true }} style={{ marginBottom: 0, marginRight: 50 }}>
                  {first.render ? first['render'](data[first.dataIndex]) : data[first.dataIndex] || '--'}
                </Paragraph>
              </Col>
            </>
          ) : null}
          {second ? (
            <>
              <Col span={3} style={{ color: '#4E5969' }}>
                {fields[rowIndex * 2 + 1].title}
              </Col>
              <Col span={9}>
                <Paragraph ellipsis={{ rows: 1, expandable: true }} style={{ marginBottom: 0 }}>
                  {second.render ? second['render'](data[second.dataIndex]) : data[second.dataIndex] || '--'}
                </Paragraph>
              </Col>
            </>
          ) : null}
        </Row>
      );
    })
  }

  const renderBlock = () => {
    const rowCount = fields.length;
    return new Array(rowCount).fill(0).map((_row, rowIndex) => {
      const isLastRow = rowIndex === rowCount - 1;
      const fieldItem = fields[rowIndex];
      return (
        <Row className="detailInfoFont" style={{ marginBottom: isLastRow ? 0 : '10px' }} key={rowIndex}>
          <Col span={3} style={{ color: '#4E5969' }}>
            {fieldItem.title}
          </Col>
          <Col span={9}>
            <Paragraph ellipsis={{ rows: 1, expandable: true }} style={{ marginBottom: 0, marginRight: 50 }}>
              {fieldItem.render ? fieldItem['render'](data[fieldItem.dataIndex]) : data[fieldItem.dataIndex] || '--'}
            </Paragraph>
          </Col>
        </Row>
      )
    })
  }
  return (
    <Card {...getCardConfig(title)}>
      {type === 'block' ? renderBlock() : renderFlex()}
    </Card>
  );
};

export default DescriptionSection;
