class SearchPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    return true
  end

  def new?
    create?
  end

  def show?
    true
  end

  def search?
    true
  end
end
