/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAACXBIWXMAAAsSAAALEgHS3X78AAANsUlEQVR4nO2ae3QT153Hv6PHSCONpLFefj/wW7YJJsbghi2P1KanDXQpNNtNsoSYxwZI0rAJSUvDaZMGUrqkIY+SQps9pSdL9uzSZNNuskkxAZYECAQIxNiYYMsmluWXbOv9GEkz+4eQbMWS37jiHH//kube+c29n/P7/e69vxmC53nMaLgEf+sBJKpmwMTRDJg4mgETRzNg4mgGTBzNgImjGTBxNAMmjmbAxNEMmDiaARNHM2DiSPS3HsBkRBBEOQBGrZQ/BAA8+N4Bu/sQz/OXJm37dio7EATBqGhqA3isDXJcplJOydRKmThJIQMpFsHp8aG73852WmysSCjY5PT4Dk34WbcDGIIgchiF7N+9Pn9FyaxUaYaOgZySxO3fM+DAmStGTigQXHa4vXfzPG8d7zOnPZQIgig3GIqqJSRZ9vW2S5frDwJo43m+7WZfRiWn3qAk4hVFWclkbpo2rl1TzwCaTb1uu8vjFQmFZikpvnCzaQmAd8c9zunwGIIgystKDb9xOl1llZV3UnPL7yBnl5VG9bHZbKi/0ojzFy65W1qMfj/LOm3WAbowK1lVlJUc1/aAw40z9UaWB3/K7vI+MRX5BbjFYAiCYPJyZx1Ta5IMG9c9KE1NTY20qVRKzC4rGXaPzWbHzhf2oO7IUczJ0Y4YMkazBfUtHRa3l60Me9mUjf1WgSkszF9us9kP73zuGemxYyfw+fkLmF+YEmm3OFkYu6y4s7IS1XcvwZ/e+TNsNhtMHWa4nU5oaAkYhQwZ+iSQIuEw+0azBY2tnZ+PlEMIgsgpLS1+BECx0+manZqScsPhdJxraGjaNxrIWwKmsDB/v0AgqD38H38kv7N8Ff6pKhMVWcqYfU9e78N/nf0KS5YswiNbNiAjPQ0AcPbceXz4wRF8dPwkSAGgZ+QI55gwFLvLc+ewCREEU1iQv8Fms20rKipQLPrmXbIF8ytQYijC2XPnYTKZsefXr3mTk/X/eaXh6ta4UKcSDEEQTFmp4T2Doahyx0+fIlffez9Wz9GjIkuJJrMNmRo55JLh+d7lC+CN02bocwrwk6cfh0ajAUEM7j1NHWa88vI+HP+/T6CkSJgt1h5/IDif5/kbQ5690lBcuM3pcpV9/++Xq1avWhGBHEuvvHYAh99+16LX6VZdulz/8bC5TBUYgiDK09PT6n76kye0EgmJrU/8GAKewxsb/w4AsPH3H0MkFOC36xbGtVH3pQ3Hm3rwuwMvQafTQ0bRw/scPY4jR0/g2pfXrc3NRkqtTnKo1Umiyoo7maoFFaipXjrmMTdevYYVK+8DgFlfD61JL9cEQTDlc2a/nJKSfN/v979KPrfzBTRda0JqOg1VcMiDSCEIkQBtvQ7k6BQxbdUUqmCz2vDw5m049Obr8Pk8kFE0JBJqsE/10vDkmZuX4mfnUVR39ATycnMONLe0tn29bcJgCIJgCgrydmvU6ge+vexbtEAA/MN9a6DWSjErPwlOhw+mPnekPxfk4fOy0CmpmPbaeh04eX0ATb0ePLnt0dA9XBBOlw1uj3MYoLGK5zk4XTYo6KSo66YOMw6//a7FbO7aFOu+cYMJe0he7qzVtWsfoGlajp89uwtSGY9ZBQyEwlBuoBUS3GjpR6/dC51Sip0/qACAmDnm306ZcNHYjfLychzc8yQkEhGGhvhEAYWhsKxvWNtLe19nZRRVG3ee48kxWVkZD3g93t/9y9ZHZPn5udj+zM/hcFqh1VMgJdFLqs3qRZfZjrmZamz9zrBNbpQ+bLTA5AiitcuGivLZ2PToJmg0DLxeF2KNTyAQQiKhIJVQEAiGL+UA4PN54PY4wXGheNaoB7cKpg4zHqzdfKOt7auceGMaM5jiosKPkpKYRRvXrxW98Ks9sPT1Ij1TGQXE4/ajt9sJ3s+hOI3BsrI0lGYkjWB1uI42WvD2meuoqV6Cp7c/BTEphMfjjNtfIBBCKBBCJCbB8xyCgQACQX8UUJFQBJVq8DjxxLYd7JWGxtXNLa3vxbM7JjAlhqJPLJa+hdnZ6TC2tkKtk4BWDOa8fosb9gEPtLQE98zJxMLC+Fv4scjjC+KvX3SgrqELO57Zhu8u/y6cThv8AXZC9mi5KhJ+Z8+dx/Ydz4/oLcAYwJQYij6pqV668OLFS+joMkKlJiNt/RY3rBY38pIV2LC4CDqldEIDjyWrK4B+hw9vnWkBrUnGvgP7IJWK4XI7IuExFpGkJCrx/uAfH/LabfZ7R/IWYJQKHkWJ93u8joWPP/YwtmxeD0qqRDDIoctsx5cNPShi5HhlTRW2r5gzpVAAgJGLoFZIsH5xEUpUQdRU34MjH9YhidGBlqsgEo6+bkilMtByVeT/H/74FhwO5/ujQQFG8BiCIHIkUlG9oSyZfvGFVzArOxdVC7+FAOvByopsLCpOibnCTLWsrgA8viA8bCDiPb98cTcy0tMQCPoR8LPwB1jw3JCcIiaHJebGq9fwz5u3Wjo7uwvGUp+JOzOZTPysVk/TMpkcel0oZxQW5ON+Aznl3jGSGLkIgQAHkCKsX1yE+vY+rLnvQXx72d3Y8qPHoFQqIIV8RBt1R49j+47nnQMD1sqxFq3ieoxYLHTMvyuffuzhrZg/rwpA6HyR1PXZuFea8cofDI1JLCQAABwP9NvZyHUA+ODyV2jscqJq/jysWV+LEkPRMDumDjNe2vs6e+HipXZTh3neeCp5ccEUFOTwbx48AL1OH7n28KbHsSzNF3dLPxXyB3n02VnoGQkERHRbOKyGqr69D2eNFvS4OZaSyVk5LQsAgN3uICQSSbvH7dlt6jCPu/YbM5QIgihf9f0VUVAAoOobC3D5s+PI0UX3D+9uJysvy8Hq8kMkIIZBAUJhJRQATs8gnNmZGszO1GDnuxfYtt6+zInUd2Mp3qrExDqy1669H25ZMnZ90IKmbjdcvgAOf2rEv/7P5UkNIsjxGHD6MeD0g+cBoTAGlZtSUCJoVSRIUfTQa2Zn0Blq+s1JDWSI4oFpu3S53h2rYV3tGtwxbwFePdKEJ9/8FDKJGM/ePAeNVyEPCaDHysLLcpHrohHAAKHco1GKkUSLISVDU1iQlwyRkKhOYWTLJzSYrylujsnKyrD+5Z23VFebruHTsxdw+tQp2KxWzEphkJ0kRXmKZFzhw/FAIMDBF+AQCPLw+TkMfXR9ex+ud9mwqjIXNCWEghr7VoDjAdbPodPqxt7//cLZZfVMOqTigsnNSm8GH8y7y5CBDAWB4uTY1TcgNKjwAP3B0O9AkAfHATzPR60mseRhA3jtr/XYsNQANS0dN5ihOtHYif8+1/a5ecA1rOw5HsV9emu7uTpdLb+2OFtGikVCcBwPhycA1h+aZJDjEeQmV/3zsAGcae7C+ZZeLC5Jg5qefAJfUpKKBtPAXL2KOtRj8zwwUTsjnpVUMskWJUXuKstUMwXJqqi2Du/grrLD6obb5x/839mDZAXpztYqZEAIQEu3Pcq1fYGgiOf5Pl+AU65bXJSUqx+0PxmPCWv3ny/7PWxgZ6Np4BcTuX/UQyRBEIxaLrlHSiv3KRlGVbWgEkqlAiWGQiiVCpz8+DQYhsHG9Q9G7nl+14s4+fHp88bWtucAOAGA5/kTseyrZJItc3O0+1ZV5kauSUkBkmjxROYTkcsXwM8PXwjKJaJfTATOuApVep12i0Ag+FlJSbH6h/euFNdUL0Xd0ePY9MiToCip/4f3rhIvq1mCBfPn4e13/oK9r/7WIqOo2tEObRpa2vf0irlqigx5CSkSQKOcHBhgcnAm9JaAIIjy0tLi5/v7B6r0Op3U2NpGKxWKfgA/UioVm+12h0Gr1ZA6nZY++tEJZGdn3pCQkt98eb35T7FedGVpFQe/WZy6dkHeYB0nVT3hGneUwnCEAmKvsdv+1JjnONnXJwRBMADKgehwIQgiB0BOWanhIQAIBoP5AqFg4MqVqyti2MjRK6nGZ1ZWRIq5WhUZOStNhV77sIE19jhOdfS7Vo1lKU+Yz0D0KtnF2kXFc9PVoZMyIxeBksSu505U73/ejvcufmXpc3hrRnv5nzCfmgWD3K+PNZoitUuvnxup+4R0z9xM/Ph7d2jTkmSn85KVB296e0wlDJg+p/eQsdvu9LABAIDvFoABgBydAi+v/QZVkatdq6DE7Rkaen8sQAkTSgCQqVHsWWRI3RZOwkPPQrdCLl8AJxo7UfeFyeMPcmaFVPwJD/S29jjeTygwBEEweiVlDidhuVQIpWx6PvrqtXvRY/eg1+5Fr92TWF9t8jxvzVDTF5u7bAvzU1Rw+4LTBkanlEYdihMmx4QV4LjdZ5q7WADgeUSVI6ZTCeUxANBldb9HS0nWwwZIihTB6+duaZ6Jp4TzGABIkkv2n23pARB6KznJQ/yElJBgTP3OXccaBvc0Pnbsbx6nSgkJhud5Ky0Rf9bcZQMAuLwzYCIamoT9wdGrgFOthEu+YYWSsNgXTsIeXxDiaVq6gQT2GACgSNHL4STs9k1vOCU0GIvD+9JHV0xeYPr3NAkNhud5q0IqvhBOwrfixB1PCQ0GADoGXI+Gk7B3GpfthAfD8/yl5m67vd/pndZwSngwAECJhb8KJ+HpCqfbAkyn1f3GZ8YeGzB94XRbgOF53ioSEBfr2/umLZxuCzAA0G3zrDt6c+mejnC6bcDwPN/m9Pq7+53eaQmn/we+tAHkN+3ywwAAAABJRU5ErkJggg==';
export default image;