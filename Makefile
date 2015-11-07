
push:
	git push && git push upstream && git push --tags && git push upstream --tags

release:
	gulp release:adminapp:$(bump) && gulp release:actionapp:$(bump) && gulp release:incidentapp:$(bump) && gulp release:landingapp:$(bump)

tag:
	git tag adminapp-$(version) && git tag actionapp-$(version) && git tag incidentapp-$(version) && git tag landingapp-$(version)

publish-testing:
	gulp publish:testing:adminapp && gulp publish:testing:actionapp && gulp publish:testing:incidentapp && gulp publish:testing:landingapp

publish-staging:
	gulp publish:staging:adminapp && gulp publish:staging:actionapp && gulp publish:staging:incidentapp && gulp publish:staging:landingapp

publish-production:
	gulp publish:production:adminapp && gulp publish:production:actionapp && gulp publish:production:incidentapp && gulp publish:production:landingapp

.PHONY: push
