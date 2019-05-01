import simplejson as json

from flask_babel import lazy_gettext as _
from flask_appbuilder import expose
from flask_appbuilder.security.decorators import has_access

from superset.views.base import BaseSupersetView
from superset import appbuilder


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


appbuilder.add_view(Bblfsh, "UAST", label=_('UAST'),
                    category_icon='fa-steam', icon='fa-steam')
