class Lab
    constructor: (@name, @description, @url) ->

class window.LabsListViewModel
    constructor: ->
        @list = ko.observableArray [
            new Lab "Interpolations", "Lagrange's Method and method of Cubic Splines", "./Interpolations"
            new Lab "Nonlinear Equations", "Newton's Method and method of bisection", "./NonlinearEquations"
            new Lab "Computing Integral", "Simpson's Method with error estimate using Runge's method", "./IntegralCompute"
            new Lab "Cauchy Problem", "Eiler's and Runge Kutti's Methods", "./CauchyProblem"
        ]
