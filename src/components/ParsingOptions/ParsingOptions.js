import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import SeparatorSelector from './SeparatorSelector';
import ThousandsSeparatorSelector from './ThousandsSeparatorSelector';
import DecimalsSeparatorSelector from './DecimalsSeparatorSelector';
import DateLocaleSelector from './DateLocaleSelector';
import StackSelector from './StackSelector';

import styles from './ParsingOptions.module.scss';
import { useTranslation } from 'react-i18next';

export default function ParsingOptions(props) {
  const { t } = useTranslation(['dataloader']);

  return (
    <>
      <Row>
        <Col>
          <Table bordered hover className={styles.customTable}>
            <thead>
              <tr className={styles.headerContainer}>
                <th colSpan={props.userDataType === 'csv' ? 4 : 3}>
                  {t('separator.title')}
                </th>
                <th>{t('datatransform.title')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.bodyContainer}>
                {props.userDataType === 'csv' && (
                  <td>
                    <SeparatorSelector
                      title={t('separator.column.name')}
                      value={props.separator}
                      onChange={(nextSeparator) =>
                        props.setSeparator(nextSeparator)
                      }
                    />
                  </td>
                )}
                <td>
                  <ThousandsSeparatorSelector
                    title={t('separator.thousands.name')}
                    value={props.thousandsSeparator}
                    onChange={(nextSeparator) =>
                      props.setThousandsSeparator(nextSeparator)
                    }
                  />
                </td>
                <td>
                  <DecimalsSeparatorSelector
                    title={t('separator.decimals.name')}
                    value={props.decimalsSeparator}
                    onChange={(nextSeparator) =>
                      props.setDecimalsSeparator(nextSeparator)
                    }
                  />
                </td>
                <td>
                  <DateLocaleSelector
                    title={t('datelocale')}
                    value={props.locale}
                    onChange={(nextLocale) => props.setLocale(nextLocale)}
                  />
                </td>
                <td>
                  <StackSelector
                    title={t('datatransform.stack')}
                    value={props.stackDimension}
                    list={props.dimensions}
                    onChange={(nextStackDimension) =>
                      props.setStackDimension(nextStackDimension)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
