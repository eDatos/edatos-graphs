import { formatNumber } from './parseUtils';

// Intl uses non breaking spaces as group and compact separators, and which one
// it picks depends on the ICU version bundled with the runtime
const normalize = (value) => value.replace(/\s/g, ' ');

describe('formatNumber', () => {
  it('keeps the same number of decimals on every compact label', () => {
    expect(normalize(formatNumber(1234, 'compact', 'es', 0))).toBe('1 mil');
    expect(normalize(formatNumber(12345, 'compact', 'es', 0))).toBe('12 mil');
    expect(normalize(formatNumber(123456, 'compact', 'es', 0))).toBe('123 mil');
    expect(normalize(formatNumber(1234, 'compact', 'es', 1))).toBe('1,2 mil');
  });

  it('pads the standard notation up to the given decimals', () => {
    expect(normalize(formatNumber(1234, 'standard', 'es', 1))).toBe('1.234,0');
    expect(normalize(formatNumber(1234.56, 'standard', 'es', 1))).toBe(
      '1.234,6'
    );
    expect(normalize(formatNumber(1234.56, 'standard', 'es', 0))).toBe('1.235');
  });

  it('clamps the decimals to the range accepted by Intl', () => {
    expect(normalize(formatNumber(1234, 'standard', 'es', -1))).toBe('1.234');
    expect(() => formatNumber(1234, 'standard', 'es', 99)).not.toThrow();
  });

  it('pins compact to one decimal when no decimals are given', () => {
    expect(normalize(formatNumber(1234, 'compact', 'es'))).toBe('1,2 mil');
    expect(normalize(formatNumber(1234, 'standard', 'es'))).toBe('1.234');
  });

  it('leaves the original format untouched', () => {
    expect(formatNumber(1234.56, 'original', 'es', 0)).toBe(1234.56);
  });
});
