import {Button, Row, Col, Form, Input, DatePicker, Upload, Spin, Modal} from 'antd';
import cx from 'classnames';
import {normFile, beforeUpload, dummyRequest} from '../../../utils/images';
import SelectWinner from './SelectWinner';
import styles from '../styles/EditorUI.module.css';

const EditorUI = props => {
  const {
    isNew,
    preview,
    handlePreview,
    form,
    loading,
    campaign,
    save,
    sending,
    share,
    selectWinnerVisible,
    validateSelectWinner,
    closeModal,
  } = props;

  if (loading) {
    return (
      <div className={styles.loader}>
        <Spin size="large" />
      </div>
    );
  }

  const getAction = () => {
    if (isNew) {
      return (
        <Form.Item
          className={styles.submit}>
          <Button
            className={styles.newCampaign}
            loading={sending}
              htmlType="submit"
          >
            Create New Campaign
            <span className="material-icons-round">
              add
            </span>
          </Button>
        </Form.Item>
      );
    } else if (!campaign.winner.length) {
      return (
        <div className={styles.actions}>
          <span onClick={share} className={styles.share}>
            Share
            <span className="material-icons-round">
              ios_share
            </span>
          </span>
          <Button
            className={styles.selectWinner}
            onClick={validateSelectWinner}
          >
            Select the winner
          </Button>
        </div>
      );
    }
    return (
      <div className={styles.actions}>
        <span className={styles.winner}>
          Winner: {campaign.winner}
        </span>
      </div>
    );
  };

  return (
    <div className={styles.editor}>
      <Form
        name="campaign"
        form={form}
        onFinish={save}
        colon={false}
        requiredMark={false}
        layout="vertical"
        autoComplete="off"
        className={cx(styles.formWrap, {[styles.editCampaign]: !isNew})}>
        <div className={styles.header}>
          <div className={styles.titles}>
            <span className={styles.title}>
              {`${isNew ? 'Create' : 'Active'} campaign`}
            </span>
            <span className={styles.subtitle}>
              Bring the world of bits together with the world of atoms 🚀
            </span>
          </div>
          {getAction()}
        </div>
        <Row gutter={40}>
          <Col span={isNew ? 24 : 17}>
            <div className={styles.wrapper}>
              <Row gutter={40}>
                <Col span={7}>
                  <div className={styles.photo} style={{backgroundImage: `url(${preview})`}}>
                    {!preview && (
                      <span className="material-icons-round">
                        add_photo_alternate
                      </span>
                    )}
                  </div>
                  {isNew && (
                    <Form.Item
                      name="image"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      className={styles.itemUpload}
                      extra={
                        <span className={styles.extraLabel}>
                          Formats .jpg, .png and max 2MB.
                        </span>
                      }
                    >
                      <Upload
                        maxCount={1}
                        showUploadList={false}
                        customRequest={e => dummyRequest(e, handlePreview)}
                        beforeUpload={beforeUpload}
                        listType="picture">
                        <Button size="large" className={styles.uploadImage}>
                          Upload Image
                        </Button>
                      </Upload>
                    </Form.Item>
                  )}
                </Col>
                <Col span={17}>
                  <Form.Item
                    label={
                      <span className={styles.label}>
                        Title
                      </span>
                    }
                    name="title"
                    rules={[{required: true, message: 'Title is required'}]}
                  >
                    <Input
                      placeholder="Ex: Hoodie Contest"
                      readOnly={!isNew}
                      size="large"
                      className={styles.input}
                      bordered={false}
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <span className={styles.label}>
                        Description
                      </span>
                    }
                    name="description"
                    rules={[{required: true, message: 'Description is required'}]}
                  >
                    <Input
                      placeholder="Ex: Join the contest and win a brand new Smart Hoodie"
                      readOnly={!isNew}
                      size="large"
                      className={styles.input}
                      bordered={false}
                    />
                  </Form.Item>
                  <Row gutter={20}>
                    <Col span={8}>
                      <Form.Item
                        label={
                          <span className={styles.label}>
                            End date
                          </span>
                        }
                        name="end_date"
                        rules={[{required: true, message: 'End date is required'}]}
                      >
                        <DatePicker
                          showTime
                          className={styles.picker}
                          disabled={!isNew}
                        />
                      </Form.Item>
                    </Col>
                    {/* <Col span={4}>
                      <Form.Item
                        label={
                          <span className={styles.label}>
                            Winners
                          </span>
                        }
                        name="winners"
                        rules={[{required: true, message: 'Winners quantity is required'}]}
                      >
                        <Input
                          placeholder="3"
                          readOnly={!isNew}
                          size="large"
                          className={cx(styles.input, styles.winners)}
                          bordered={false}
                          type="number"
                        />
                      </Form.Item>
                    </Col> */}
                  </Row>
                  <Form.Item
                    label={
                      <span className={styles.label}>
                        Describe the Prize
                      </span>
                    }
                    name="prize"
                    rules={[{required: true, message: 'Prize is required'}]}
                  >
                    <Input
                      placeholder="Ex: Join the contest and win a brand new Smart Hoodie"
                      readOnly={!isNew}
                      size="large"
                      className={styles.input}
                      bordered={false}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
          {!isNew && (
            <Col span={7}>
              <div className={styles.wrapper}>
                <div className={styles.playersHeader}>
                  <span className={styles.playersHeaderLabel}>Players</span>
                  <span className={styles.playersHeaderNumber}>{campaign?.players?.length}</span>
                </div>
                <div className={styles.players}>
                  {campaign.players.map((player, index) => (
                    <div key={player.id} className={styles.player}>
                      <span className={styles.playerNumber}>
                        {index + 1}
                      </span>
                      <span className={styles.playerAddress}>
                        {player.account}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Form>
      {!isNew && (
        <Modal
          destroyOnClose
          width={500}
          footer={false}
          wrapClassName={styles.modal}
          closable={false}
          visible={selectWinnerVisible}>
          <SelectWinner players={campaign?.players} title={campaign.title} close={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default EditorUI;
