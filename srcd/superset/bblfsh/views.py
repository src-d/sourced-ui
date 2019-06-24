# pylint: disable=C,R,W
from flask import request, Response
from flask_appbuilder import expose
from flask_appbuilder.security.decorators import has_access
from flask_babel import lazy_gettext as _
import requests
import simplejson as json

from superset import appbuilder
from superset.config import BBLFSH_WEB_ADDRESS
from superset.views.base import BaseSupersetView


class Bblfsh(BaseSupersetView):
    default_view = 'explore'

    @has_access
    @expose('/explore/')
    def explore(self):
        """UAST Viewer"""
        d = {
            'common': self.common_bootsrap_payload(),
        }
        return self.render_template(
            'superset/basic.html',
            entry='uast',
            bootstrap_data=json.dumps(d),
        )

    @has_access
    @expose('/api/<path>', methods=['GET', 'POST'])
    def api(self, path):
        """ Proxy frontend request to bblfsh-web server """
        resp = requests.request(
            method=request.method,
            url='%s/api/%s' % (BBLFSH_WEB_ADDRESS, path),
            headers={key: value for (key, value)
                     in request.headers if key != 'Host'},
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False)

        excluded_headers = ['content-encoding',
                            'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items()
                   if name.lower() not in excluded_headers]

        response = Response(resp.content, resp.status_code, headers)
        return response


appbuilder.add_view(Bblfsh, 'UAST', label=_('UAST'),
                    category_icon='fa-tree', icon='fa-tree')
