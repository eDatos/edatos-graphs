import { Card, Form, Row } from 'react-bootstrap';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Typeahead, TypeaheadInputMulti } from 'react-bootstrap-typeahead';
import Token from '../WMSMap/Token';
import { CustomDropdownIcon } from '../CustomDropdown/CustomDropdownIcon';
import styles from '../DataLoader/DataLoader.module.scss';
import classNames from 'classnames';

const SelectionLayerCombo = (props) => {
  const { t } = useTranslation(['translation']);
  const styleMap = { zIndex: `10${10 - props.index}` };
  const onMove = useCallback(
    (dragIndex, hoverIndex) => {
      const item = props.selectedLayers[dragIndex];

      const newSelected = props.selectedLayers.slice();
      newSelected.splice(dragIndex, 1);
      newSelected.splice(hoverIndex, 0, item);
      props.onChange(newSelected);
    },
    [props]
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <Form.Group className="mb-2">
        <Typeahead
          id="selection-layer"
          labelKey="Title"
          multiple
          onChange={props.onChange}
          options={props.layers}
          placeholder={t(
            'global.section.wmslayerselection.configuration.placeholder'
          )}
          style={styleMap}
          className={props.className}
          renderInput={(inputProps, childProps) => (
            <TypeaheadInputMulti
              {...inputProps}
              selected={props.selectedLayers}
            >
              {props.selectedLayers.map((option, idx) => (
                <Token
                  index={idx}
                  key={option.Title}
                  onMove={onMove}
                  onRemove={childProps.onRemove}
                  option={option}
                >
                  {option.Title}
                </Token>
              ))}
            </TypeaheadInputMulti>
          )}
          selected={props.selectedLayers}
        >
          {({ isMenuShown }) => <CustomDropdownIcon isOpen={isMenuShown} />}
        </Typeahead>
      </Form.Group>
    </DndProvider>
  );
};

const SelectionStyle = ({
  options,
  layer,
  selectedLayers,
  setSelectedLayers,
  index,
  className,
}) => {
  const [styleSelected, setStyleSelected] = useState([]);
  const { t } = useTranslation(['translation']);

  const handleShowLayerNameChange = () => {
    let newSelectedLayers = [...selectedLayers];
    layer.showLayerName = !layer.showLayerName;
    if (!layer.showLayerName) {
      layer.hideStyleName = false;
    }
    newSelectedLayers[index] = layer;
    setSelectedLayers(newSelectedLayers);
  };
  const handleStyleChange = (stylesSelected) => {
    let newSelectedLayers = [...selectedLayers];
    layer.StyleSelected = stylesSelected;
    newSelectedLayers[index] = layer;
    if (stylesSelected.length !== 1) {
      layer.hideStyleName = false;
    }
    setSelectedLayers(newSelectedLayers);
    setStyleSelected(stylesSelected);
  };
  return (
    <>
      <Form.Label className={classNames(styles['lighter'], 'mt-3')}>
        {t('global.section.wmslayerselection.style.title')}: {layer.Title}
      </Form.Label>
      <Typeahead
        id="select-style"
        labelKey="styleTitle"
        multiple
        onChange={handleStyleChange}
        options={options}
        placeholder={t('global.section.wmslayerselection.style.placeholder')}
        selected={styleSelected}
        className={className}
      >
        {({ isMenuShown }) => <CustomDropdownIcon isOpen={isMenuShown} />}
      </Typeahead>
      <Row className="mt-3">
        <div className="col d-flex align-items-center">
          <Form.Check
            id="showLegend"
            className="mr-4 custom-control custom-checkbox"
            type="checkbox"
          >
            <Form.Check.Input
              disabled={styleSelected.length === 0}
              checked={layer.showLegend}
              className="custom-control-input"
              onChange={() => {
                let newSelectedLayers = [...selectedLayers];
                layer.showLegend = !layer.showLegend;
                newSelectedLayers[index] = layer;
                setSelectedLayers(newSelectedLayers);
              }}
            />
            <Form.Check.Label
              className={classNames('custom-control-label', styles['lighter'])}
            >
              {t('global.section.wmslayerselection.style.legend')}
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            id="showLayerName"
            className="mr-4 custom-control custom-checkbox"
            type="checkbox"
          >
            <Form.Check.Input
              disabled={styleSelected.length === 0}
              checked={layer.showLayerName}
              className="custom-control-input"
              onChange={handleShowLayerNameChange}
            />
            <Form.Check.Label
              className={classNames('custom-control-label', styles['lighter'])}
            >
              {t('global.section.wmslayerselection.style.showlayer')}
            </Form.Check.Label>
          </Form.Check>
          <Form.Check
            id="hideStyleName"
            className="mr-4 custom-control custom-checkbox"
            type="checkbox"
          >
            <Form.Check.Input
              disabled={styleSelected.length !== 1 || !layer.showLayerName}
              checked={layer.hideStyleName}
              className="custom-control-input"
              onChange={() => {
                let newSelectedLayers = [...selectedLayers];
                layer.hideStyleName = !layer.hideStyleName;
                newSelectedLayers[index] = layer;
                setSelectedLayers(newSelectedLayers);
              }}
            />
            <Form.Check.Label
              className={classNames('custom-control-label', styles['lighter'])}
            >
              {t('global.section.wmslayerselection.style.hidestyle')}
            </Form.Check.Label>
          </Form.Check>
        </div>
      </Row>
    </>
  );
};

function LayersOptionCard({
  title,
  layers,
  selectedLayers,
  setSelectedLayers,
  index,
  onRemove,
}) {
  const LayerStyles = selectedLayers.flatMap((layer) => [
    {
      [layer.Name]: Object.fromEntries(
        Object.entries(layer).filter(
          ([key]) =>
            key !== 'Name' &&
            key !== 'Title' &&
            key !== 'showLegend' &&
            key !== 'showLayerName' &&
            key !== 'hideStyleName'
        )
      ),
    },
  ]);
  const { t } = useTranslation(['translation']);

  return (
    <Card className="mt-3">
      <Card.Header className="d-flex align-items-center justify-content-between">
        <span className="title">{title}</span>
        <i className="fa-solid fa-circle-x" onClick={() => onRemove(index)}></i>
      </Card.Header>
      <Card.Body className="px-3">
        <Form className={classNames(styles['form'], '')}>
          <Form.Label className={styles['lighter']}>
            {t('global.section.wmslayerselection.configuration.title')}
          </Form.Label>
          <SelectionLayerCombo
            index={index}
            layers={layers}
            selectedLayers={selectedLayers}
            onChange={setSelectedLayers}
            className="custom-multiselect raw-dropdown"
          />
          {selectedLayers.map((layer, index) => {
            const options = LayerStyles.filter((o) => o[layer.Name])
              .flatMap((o) => o[layer.Name])
              .reduce(
                (acc, curr) =>
                  acc.concat(
                    Object.entries(curr).flatMap(([k, v]) =>
                      k !== 'StyleSelected' ? v : []
                    )
                  ),
                []
              )
              .sort((a, b) => a.styleTitle.localeCompare(b.styleTitle));
            return (
              <React.Fragment key={index}>
                {options.length > 0 && (
                  <SelectionStyle
                    options={options}
                    layer={layer}
                    selectedLayers={selectedLayers}
                    setSelectedLayers={setSelectedLayers}
                    index={index}
                    className="custom-multiselect raw-dropdown"
                  />
                )}
              </React.Fragment>
            );
          })}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LayersOptionCard;
