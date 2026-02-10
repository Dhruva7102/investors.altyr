ARG GOLANG_VERSION
ARG ALPINE_VERSION
FROM golang:${GOLANG_VERSION}-alpine${ALPINE_VERSION} as builder

RUN apk --no-cache --virtual .build-deps add make gcc musl-dev binutils-gold

COPY . /app
WORKDIR /app

RUN make build


FROM alpine:${ALPINE_VERSION}

LABEL maintainer="community@krakend.io"

RUN apk upgrade --no-cache --no-interactive && apk add --no-cache ca-certificates tzdata && \
    adduser -u 1000 -S -D -H krakend && \
    mkdir /etc/krakend && \
    echo '{ "version": 3 }' > /etc/krakend/krakend.json

## Changes started
COPY locales/en.json /etc/krakend/locales/en.json
COPY krakend.json /etc/krakend/krakend.json

RUN chown -R 1000:1000 /etc/krakend
RUN chmod -R 777 /etc/krakend
## Changes ended

COPY --from=builder /app/krakend /usr/bin/krakend

USER 1000

WORKDIR /etc/krakend

# restarting krakend with new config on krakend.json change
# Local : reflex -g krakend.json -s -- ./krakend run -c krakend.json
# ENTRYPOINT [ "/usr/bin/reflex -g 'krakend.json' -s  -- /usr/bin/krakend" ]
ENTRYPOINT [ "/usr/bin/krakend" ]
CMD [ "run", "-c", "/etc/krakend/krakend.json" ]

EXPOSE 8000 8090
