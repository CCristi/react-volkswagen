import {{ '{' }}expect{{ '}' }} from 'chai';
import {{ '{' }}{% for method in methods %}
  {{ method.name }},{% endfor %}
{{ '}' }} from '{{ modulePath | importEscape }}';

describe('Selector tests', () => {{ '{' }}
{% for method in methods %}
  it('{{ method.name }}()', () => {{ '{' }}
  {% if method.mock %}
    const mock = {{ method.mock | json_encode(2) | raw }};

    expect({{ method.name }}(mock)).to.be.deep.equal({{ method.result | json_encode(2) | raw }});
  {% endif %}
  {{ '}' }});
{% endfor %}
{{ '}' }});
