import React from 'react';
import XMLParser from 'react-xml-parser/xmlParser';
import classNames from 'classnames';
import { Translation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import LayersOptionCard from '../../LayersOptionCard/LayersOptionCard';
import { ResetButton } from './../../ResetButton';
import styles from './../DataLoader.module.scss';
import WarningMessage from '../../WarningMessage';

export default class WMSFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      loading: false,      
      type: 'wms',
      error: undefined,
    };
  }  

  removeWMS = (index) => {
    const newSources = [...this.props.sources];
    newSources.splice(index, 1);
    this.updateSources(newSources);
  };

  setSelectedLayers = (layers, index) => {
    const sources = [...this.props.sources];
    sources[index].selectedLayers = layers;
    this.updateSources(sources);
  };

  updateSources(sources) {    
    this.props.setDataSource({
      type: this.state.type,
      sources: sources,
    });
  }

  handleSubmit = (event) => {
    function getStyleName(children) {
      return children.children
        .filter((element) => element.name === 'Name')
        .map((e) => e.value)[0];
    }

    function getStyleTitle(children) {
      const styleTitle = children.children
        .filter((element) => element.name === 'Title')
        .map((e) => e.value)[0];
      return styleTitle || 'Default';
    }

    function getURL(legendURL) {
      return legendURL.children.filter(
        (element) => element.name === 'OnlineResource'
      )[0].attributes['xlink:href'];
    }

    function getLegendURL(children) {
      return children.children.filter(
        (element) => element.name === 'LegendURL'
      )[0];
    }

    function parseStyleChildren(children) {
      const legendURL = getLegendURL(children);
      if (legendURL) {
        const styleName = getStyleName(children);
        const styleTitle = getStyleTitle(children);
        const attributes = legendURL.attributes;
        attributes['url'] = getURL(legendURL);
        return [
          {
            [styleName]: {
              styleTitle: styleTitle,
              styleName: styleName,
              [legendURL.name]: attributes,
            },
          },
        ];
      }
      return [];
    }

    function parseNameAndTitleChildren(children) {
      return children.name === 'Title' || children.name === 'Name'
        ? [{ [children.name]: children.value }]
        : [];
    }

    event.stopPropagation();
    event.preventDefault();
    this.setState({ loading: true });
    const source = {
      url: this.state.url.split('?')[0],
      title: '',
      layers: [],
      selectedLayers: [],
    };

    axios
      .get(this.state.url)
      .then((response) => response.data)
      .then((xmlText) => {
        let parseFromString = new XMLParser().parseFromString(xmlText);
        source.title = parseFromString
          .getElementsByTagName('Service')[0]
          .children.filter((child) => 'Title' === child.name)[0].value;
        source.layers = parseFromString
          .getElementsByTagName('Layer')
          .map((input) =>
            input.children.flatMap((children) => {
              if (children.name === 'Style') {
                return parseStyleChildren(children);
              }
              return parseNameAndTitleChildren(children);
            })
          )
          .filter((input) => input.length > 1)
          .reduce((acc, curr) => {
            const entry = {};
            curr.forEach((value) => {
              Object.keys(value).forEach((key) => (entry[key] = value[key]));
            });
            return [...acc, entry];
          }, []);
        this.updateSources([...this.props?.sources ?? [], source]);        
      })
      .catch(() =>
        this.setState({
          error: {
            variant: 'danger',
            message: 'global.section.loaddata.errors.wmsServerError',
          },
        })
      )
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <Translation ns={'translation'}>
        {(t) => (
          <>
            <Form
              onSubmit={this.handleSubmit}
              className={classNames(
                styles['form'],
                'd-flex flex-column py-top-20',
                this.props?.sources?.length > 0 ? styles['layer-loaded'] : ''
              )}
            >
              <Form.Group>
                <Form.Label>
                  {t('global.section.loadLayers.message')}
                </Form.Label>
                <input
                  className={classNames('form-control', styles['borderBox'])}
                  value={this.state.url}
                  onChange={(event) => {
                    this.setState({
                      url: event.target.value,
                      error: undefined,
                    });
                  }}
                />
              </Form.Group>
              {this.state.error && (
                <WarningMessage
                  variant={this.state.error.variant}
                  message={t(this.state.error.message)}
                />
              )}
              <div className="general-buttons row">
                <button
                  className="text-icon-button btn-thin-first"
                  disabled={!this.state.url || this.state.loading}
                  type="submit"
                >
                  <i
                    className={
                      'fa-thin fa-cloud-arrow-up ' +
                      (this.state.loading ? 'fa-spin' : '')
                    }
                  ></i>
                  <span>
                    {this.props?.sources?.length > 0
                      ? t(
                          'global.section.loadLayers.addWmsButton'
                        ).toUpperCase()
                      : t(
                          'global.section.loadLayers.loadWmsButton'
                        ).toUpperCase()}
                  </span>
                </button>
                {this.props?.sources?.length > 0 && <ResetButton />}
              </div>
            </Form>
            {this.props?.sources?.map((source, index) => (
              <LayersOptionCard
                key={index}
                index={index}
                title={source.title}
                layers={source.layers}
                selectedLayers={source.selectedLayers}
                setSelectedLayers={(selectedLayers) =>
                  this.setSelectedLayers(selectedLayers, index)
                }
                onRemove={this.removeWMS}
              />
            ))}
          </>
        )}
      </Translation>
    );
  }
}
