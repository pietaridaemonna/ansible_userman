FROM centos:7
MAINTAINER Peter Ducai <peter.ducai@gmail.com>
ENV NODEJS_VERSION=v6.11.2
ENV PATH=/apps/node/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bin

RUN yum -y install make gcc gcc-c++ libmcrypt-devel && yum -y clean all
#RUN mkdir /apps && cd /apps && curl -s -L -O https://nodejs.org/dist/${NODEJS_VERSION}/node-${NODEJS_VERSION}-linux-x64.tar.xz && tar xf node-${NODEJS_VERSION}-linux-x64.tar.xz && mv node-${NODEJS_VERSION}-linux-x64 node
RUN rpm -ivh https://rpm.nodesource.com/pub_6.x/el/7/x86_64/nodejs-6.11.2-1nodesource.el7.centos.x86_64.rpm

WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install

# Bundle app source
COPY copy src/. /usr/src/app

CMD "sudo npm install"
CMD "npm start"